const requireModules = require('../require-modules.utils');

const fns = {
  'controller/cast-method-returned-value.utils': 'castMethodReturnedValue',
  'controller/capture-ctrl-meta.utils': 'captureCtrlMeta',
};

module.exports = requireModules('./')(fns);
