const token = require('../../src/services/token.service');

const jwt = (token) => ({
  getAndGenerateJwtAccessToken: (payload) =>
    token.sign(payload, { access: true }),

  getAndGenerateJwtRefreshToken: (payload) =>
    token.sign(payload, { refresh: true }),
});

module.exports = jwt(token);
