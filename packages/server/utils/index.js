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
  'either-freeze.utils': 'eitherFreeze',
  'not-empty.utils': 'notEmpty',
  'to-boolean.utils': 'toBoolean',
  'map-over.utils': 'mapOver',
  'wheater-object.utils': 'wheaterObject',
  'create-error.utils': 'createError',
  'seconds-to-hours.utils': 'secondsToHours',
  'adjust-on-create-error.utils': 'adjustOnCreateError',
  'safe-nth.utils': 'safeNth',
  'separate-jwt-token.utils': 'separateJwtToken',
};

module.exports = requireModules('./')(fns);
