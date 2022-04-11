const { requireModules } = require('../../utils/index');

const fns = {
  'set-up-routes.service': 'setUpRoutes',
  'cache-repo.service': 'cacheRepo',
  'construct-base-repository.service': 'baseRepository',
  'construct-universal-route.service': 'universalRoute',
  'capture-routes-meta.service': 'captureRoutesMeta',
  'bcrypt-hash.service': 'bcryptHash',
  'token.service': 'token',
};

module.exports = requireModules(__dirname)(fns);
