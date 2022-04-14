const requireModules = require('../../utils/require-modules.utils');

const fixtures = {
  'auth.fixtures': 'auth',
  'user.fixtures': 'user',
  'city.fixtures': 'city',
};

module.exports = requireModules(__dirname)(fixtures);
