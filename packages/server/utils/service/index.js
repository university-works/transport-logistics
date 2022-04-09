const requireModules = require('../require-modules.utils');

const fns = {
  'service/call-on-prop.utils': 'callOnProp',
  'service/ap-repo-method.utils': 'apRepoMethod',
  'service/capture-field-to-map.utils': 'captureFieldToMap',
};

module.exports = requireModules('./')(fns);
