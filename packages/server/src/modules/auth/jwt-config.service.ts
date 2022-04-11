const config = require('../../../config/config.service');

const jwtConfig = (config) => ({
  secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
  signOptions: {
    expiresIn: config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
  },
});

module.exports = jwtConfig(config);
