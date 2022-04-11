const { curry } = require('ramda');
const {
  USER_USE_CASE,
} = require('../../../errors/domain-specific/user.use-case');
const { TENANT_ROLE } = require('../../../consts/tenant-roles.const');

const { adjustOnCreateError, secondsToHours } = require('../../../utils/index');
const { token, bcryptHash } = require('../../services/index');
const { config } = require('../../../config/index');

const roleService = require('../roles/role.service');
const userService = require('../users/user.service');
const userRolesService = require('../user-roles/user-roles.service');

const authService = curry((userService, bcryptHash, token, config) => {
  const getAndGenerateJwtAccessToken = (payload) =>
    token.sign(payload, { access: true });

  const getAndGenerateJwtRefreshToken = (payload) =>
    token.sign(payload, { refresh: true });

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

  const login = (body) => {
    console.log({ body, message: 'login' });
    return { body };
  };

  const logout = (body) => {
    console.log({ body, message: 'logout' });
    return body;
  };

  const refreshAccessToken = (body) => {
    console.log({ body, message: 'refresh' });
    return { body };
  };

  const methods = {
    register,
    login,
    logout,
    refreshAccessToken,
  };

  return Object.freeze(methods);
});

module.exports = authService(userService, bcryptHash, token, config);
