const requireModules = require('../require-modules.utils');

const fns = {
  'express/ap-fields.utils': 'apFields',
  'express/app-use.utils': 'appUse',
  'express/async-wrap.utils': 'asyncWrap',
  'express/ap.utils': 'ap',
};

module.exports = requireModules('./')(fns);
