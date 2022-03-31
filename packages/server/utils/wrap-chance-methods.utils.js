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

const methods = ['first', 'last', 'name', 'hashtag'];

const constructVector = (method) => [
  method,
  prop('length', view(lensProp(method), wrapChance)),
];

const base = (acc, [method, length]) =>
  set(lensProp(method), invoker(length, method), acc);

const wrapChanceMethods = compose(reduce(base, {}), map(constructVector));

module.exports = wrapChanceMethods(methods);
