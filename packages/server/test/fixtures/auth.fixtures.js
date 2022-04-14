const { omit, assoc, compose, set, lensProp, curry } = require('ramda');
const { generateUser } = require('../../fixtures');
const { jwt } = require('../utils');

const contactId = 10;

const onRegister = compose(
  assoc('contact_id', contactId),
  omit(['last_login']),
);

const onLogin = omit(['name', 'contactId']);

const onLogout = curry((acc, registered) =>
  set(
    lensProp('refreshToken'),
    jwt.getAndGenerateJwtRefreshToken(registered),
    acc,
  ),
);

const register = onRegister(generateUser());
const login = onLogin(register);
const logout = onLogout({}, register);

module.exports = {
  register,
  login,
  logout,
};
