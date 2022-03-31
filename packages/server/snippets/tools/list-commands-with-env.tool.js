const { reduce, set, lensProp, compose } = require('ramda');
const constructMessage = require('./construct-message.tool');

/** @: base :: hash table, string, value -> ...table, fns */
const base = (acc, [key, value]) =>
  set(lensProp(key), constructMessage('development')(value), acc);

/** @: listCommandsWithEnv :: table -> mapped table */
const listCommandsWithEnv = compose(reduce(base, {}), Object.entries);

module.exports = listCommandsWithEnv;
