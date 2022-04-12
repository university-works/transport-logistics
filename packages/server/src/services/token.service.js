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
const token = () => {
  /** @: capture :: table -> params */
  const capture = (option) =>
    option.access ? jwtOptions.access : jwtOptions.refresh;

  /** @: apJwt :: method -> payload -> options -> string */
  const apJwt = curry((method, payload, option) => {
    const params = capture(option);
    return method(payload, params.secret, { expiresIn: params.expiresIn });
  });

  return {
    /** @: sign :: data -> options -> string */
    sign: apJwt(jwt.sign),
    /** @: verify :: token -> options -> string */
    verify: apJwt(jwt.verify),
  };
};

module.exports = token();
