const requireModules = require('./require-modules.utils');

const fns = {
  'require-modules.utils': 'requireModules',
  'construct-prototype.utils': 'constructPrototype',
  'wrap-chance.utils': 'wrapChance',
  'wrap-chance-methods.utils': 'wrapChanceMethods',
  'create-nth-vector.utils': 'createNthVector',
  'get-or-else.utils': 'getOrElse',
  'is-empty.utils': 'isEmpty',
  'wrap-args.utils': 'wrapArgs',
  'either-freeze': 'eitherFreeze',
  'not-empty.utils': 'notEmpty',
  'to-boolean.utils': 'toBoolean',
  'map-over.utils': 'mapOver',
  'wheater-object.utils': 'wheaterObject',
};

module.exports = requireModules('./')(fns);
