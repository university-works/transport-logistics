const { requireModules } = require('../../utils/index');

const fns = {
  'set-up-routes.service': 'setUpRoutes',
  'cache-repo.service': 'cacheRepo',
  'construct-base-repository.service': 'baseRepository',
  'construct-universal-route.service': 'universalRoute',
};

module.exports = requireModules(__dirname)(fns);
