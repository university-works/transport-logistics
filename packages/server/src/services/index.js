const { requireModules } = require('../../utils/index');

const fns = {
  'set-up-routes.service': 'setUpRoutes',
};

module.exports = requireModules(__dirname)(fns);
