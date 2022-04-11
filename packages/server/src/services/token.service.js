const jwt = require('jsonwebtoken');
const { curry } = require('ramda');
const { config } = require('../../config/index');

const jwtOptions = {
  access: {
    secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
    expiresIn: `${config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
  },
  refresh: {
    secret: config.get('JWT_REFRESH_TOKEN_SECRET'),
    expiresIn: `${config.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
  },
};

/** @: token -> always table fns */
const token = {
  /** @: sign :: data -> options -> string */
  sign: curry((payload, option) => {
    const params = option.access ? jwtOptions.access : jwtOptions.refresh;
    return jwt.sign(payload, params.secret, { expiresIn: params.expiresIn });
  }),
};

module.exports = token;
