const { curry } = require('ramda');
const { config } = require('../../../config/index');

/** @: jwtConfig :: config -> ...params -> table jwt */
const jwtConfig = curry((config, secret, expiration) => ({
  secret: config.get(secret),
  signOptions: {
    expiresIn: `${config.get(expiration)}s`,
  },
}));

module.exports = jwtConfig(config);
