const requireModules = require('../require-modules.utils');

const fns = {
  'route/to-pass-over.utils': 'toPassOver',
  'route/prop-and-key.utils': 'propAndKey',
  'route/bound-route-and-handler.utils': 'boundRouteAndHandler',
  'route/gather-routers.utils': 'gatherRouters',
  'route/without-repository-used.utils': 'withoutRepositoryUsed',
};

module.exports = requireModules('./')(fns);
