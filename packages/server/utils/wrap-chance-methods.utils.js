const {
  invoker,
  lensProp,
  view,
  compose,
  prop,
  set,
  reduce,
  map,
} = require('ramda');

const wrapChance = require('./wrap-chance.utils');

const methods = [
  'first',
  'last',
  'name',
  'hashtag',
  'state',
  'city',
  'country',
  'address',
  'postcode',
  'prefix',
  'suffix',
  'ssn',
  'email',
  'phone',
  'profession',
  'birthday',
  'sentence',
  'wp7_anid',
  'google_analytics',
  'fbid',
  'url',
  'date',
];

/** @: constructVector :: string vector -> vector string length */
const constructVector = (method) => [
  method,
  prop('length', view(lensProp(method), wrapChance)),
];

/** @: base :: acc, vector -> hash table method */
const base = (acc, [method, length]) =>
  set(lensProp(method), invoker(length, method), acc);

/** @: wrapChanceMethods :: string vector -> hash methods */
const wrapChanceMethods = compose(reduce(base, {}), map(constructVector));

module.exports = wrapChanceMethods(methods);
