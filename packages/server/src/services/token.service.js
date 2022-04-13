const jwt = require('jsonwebtoken');
const { curry } = require('ramda');
const { jwtConfig } = require('../guards/jwt/index');

const jwtOptions = {
  access: jwtConfig(
    'JWT_ACCESS_TOKEN_SECRET',
    'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
  ),
  refresh: jwtConfig(
    'JWT_REFRESH_TOKEN_SECRET',
    'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
  ),
};

/** @: token :: jwtOptions -> always table fns */
const token = (jwtOptions) => {
  /** @: capture :: table -> params */
  const capture = (option) =>
    option.access ? jwtOptions.access : jwtOptions.refresh;

  /** @: apJwt :: method -> payload -> options -> string */
  const apJwt = curry((method, payload, option) => {
    const { secret, signOptions } = capture(option);
    return method(payload, secret, signOptions);
  });

  return {
    /** @: sign :: data -> options -> string */
    sign: apJwt(jwt.sign),
    /** @: verify :: token -> options -> string */
    verify: apJwt(jwt.verify),
  };
};

module.exports = token(jwtOptions);
