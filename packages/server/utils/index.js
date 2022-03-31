const requireModules = require('./require-modules.utils');

const fns = {
  'require-modules.utils': 'requireModules',
  'construct-prototype.utils': 'constructPrototype',
  'wrap-chance.utils': 'wrapChance',
  'wrap-chance-methods.utils': 'wrapChanceMethods',
  'create-nth-vector.utils': 'createNthVector',
};

module.exports = requireModules('./')(fns);
