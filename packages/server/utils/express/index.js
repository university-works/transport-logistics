const requireModules = require('../require-modules.utils');

const fns = {
  'express/ap-fields.utils': 'apFields',
  'express/app-use.utils': 'appUse',
};

module.exports = requireModules('./')(fns);
