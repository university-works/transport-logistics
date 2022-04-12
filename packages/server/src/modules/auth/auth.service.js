const { cast } = require('@fp/common');
const {
  curry,
  compose,
  chain,
  set,
  lensProp,
  prop,
  identity,
} = require('ramda');
const {
  USER_USE_CASE,
} = require('../../../errors/domain-specific/user.use-case');
const {
  AUTH_USE_CASE,
} = require('../../../errors/domain-specific/auth.use-case');
const { TENANT_ROLE } = require('../../../consts/tenant-roles.const');

const {
  adjustOnCreateError,
  secondsToHours,
  eitherFreeze,
} = require('../../../utils/index');

const { token, bcryptHash } = require('../../services/index');
const { config } = require('../../../config/index');

const { toEitherSafe, either } = cast;

const roleService = require('../roles/role.service');
const userService = require('../users/user.service');
const userRolesService = require('../user-roles/user-roles.service');

const authService = curry((userService, bcryptHash, token, config) => {
  const getAndGenerateJwtAccessToken = (payload) =>
    token.sign(payload, { access: true });

  const getAndGenerateJwtRefreshToken = (payload) =>
    token.sign(payload, { refresh: true });

  const captureTokens = async (user) => {
    const accessToken = await getAndGenerateJwtAccessToken({
      email: user.email,
    });
    const refreshToken = await getAndGenerateJwtRefreshToken({
      email: user.email,
    });

    await userService.setCurrentRefreshTokenAndGetUser(user.id, refreshToken);

    const expiresIn = secondsToHours(
      config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    );
    return { accessToken, refreshToken, expiresIn: `${expiresIn}h` };
  };

  const register = async (credentials) => {
    if (await userService.getByEmail(credentials.email)) {
      throw new Error(
        adjustOnCreateError(
          USER_USE_CASE.EMAIL_ALREADY_TAKEN,
          credentials.email,
        ),
      );
    }
    const hashedPassword = await bcryptHash.hashPassword(credentials.password);
    const role = await roleService.getByCode(TENANT_ROLE.registered);

    const created = await userService.repository.createOne({
      data: {
        ...credentials,
        password: hashedPassword,
      },
    });

    await userRolesService.repository.createOne({
      data: {
        user_id: created.id,
        role_id: role.id,
      },
    });

    const user = await userService.repository.getById({ id: created.id });
    return captureTokens(user);
  };

  const login = async (credentials) => {
    const user = await userService.getByEmail(credentials.email);

    if (!user) {
      throw new Error(
        adjustOnCreateError(
          USER_USE_CASE.EMAIL_DOES_NOT_EXISTS,
          credentials.email,
        ),
      );
    }
    if (
      !(await bcryptHash.compareUserPassword(
        credentials.password,
        user.password,
      ))
    ) {
      throw new Error(
        adjustOnCreateError(
          AUTH_USE_CASE.PASSWORD_IS_NOT_CORRECT,
          credentials.password,
        ),
      );
    }
    return captureTokens(user);
  };

  const logout = async (credentials) => {
    const user = await userService.repository.getBy({
      condition: {
        refresh_token: credentials.refreshToken,
      },
    });
    await userService.repository.updateBy({
      condition: { id: user.id },
      data: { refresh_token: null },
    });
    return { userId: user.id };
  };

  const refreshAccessToken = async (payload) => {
    const user = await userService.repository.getBy({
      condition: {
        refresh_token: payload.refreshToken,
      },
    });

    if (!user) {
      throw new Error(
        adjustOnCreateError(
          AUTH_USE_CASE.REFRESH_TOKEN_DOES_NOT_EXISTS,
          payload.refreshToken,
        ),
      );
    }

    const generate = (email) => getAndGenerateJwtAccessToken({ email });

    const onVerify = compose(token.verify, prop('refreshToken'));

    const verify = compose(
      chain(toEitherSafe(generate)),
      toEitherSafe(onVerify(payload)),
    );

    const left = () => {
      throw new Error(
        adjustOnCreateError(
          AUTH_USE_CASE.INVALID_REFRESH_TOKEN,
          payload.refreshToken,
        ),
      );
    };

    const right = (token) => set(lensProp('accessToken'), token, {});

    return either(left, right, verify({ refresh: true }));
  };

  const methods = {
    register,
    login,
    logout,
    refreshAccessToken,
  };

  return eitherFreeze('methods can not be undefined')(methods);
});

const args = [userService, bcryptHash, token, config];

module.exports = compose(chain(identity), authService)(...args);
