const requireModules = require('../utils/require-modules.utils');

const fns = {
  'users.fixtures': 'generateUser',
  'projects.fixtures': 'generateProject',
};

module.exports = requireModules(__dirname)(fns);
