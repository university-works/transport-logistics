const { requireModules } = require('../../../utils/index');

const fns = {
  'jwt-config.service': 'jwtConfig',
  'jwt.strategy': 'jwtStrategy',
};

module.exports = requireModules(__dirname)(fns);
