const { curry } = require('ramda');

/** @: toPassOver :: key -> value -> entry key value */
const toPassOver = curry((key, value) => ({
  key,
  value: Object.entries(value),
}));

module.exports = toPassOver;
