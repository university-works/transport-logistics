const { AUTH_USE_CASE_RECORD } = require('../../../errors/domain-specific');
const { createError } = require('../../../utils/index');

const userService = require('../users/user.service');

const { AUTH_USE_CASE } = AUTH_USE_CASE_RECORD;

const jwtStrategy = (userService) => ({
  validate: async (payload) => {
    const user = await userService.getByEmail(payload.email);
    if (!user) {
      throw new Error(createError(AUTH_USE_CASE.INVALID_JWT_TOKEN, 'auth'));
    }
    return user;
  },
});

module.exports = jwtStrategy(userService);
