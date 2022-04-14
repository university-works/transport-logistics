const requireModules = require('../require-modules.utils');

const fns = {
  'express/ap-fields.utils': 'apFields',
  'express/app-use.utils': 'appUse',
  'express/async-wrap.utils': 'asyncWrap',
  'express/ap.utils': 'ap',
  'express/id.utils': 'id',
  'express/either-ap.utils': 'apEither',
  'express/app-use-as-it-is.utils': 'appUseAsItIs',
};

module.exports = requireModules('./')(fns);
