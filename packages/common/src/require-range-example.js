const { invoker, add, construct, compose, map, concat } = require('ramda');

/** @: array :: Input -> Array Input  */
const array = construct(Array);

/** @: keys :: Input -> [Input Keys]  */
const keys = invoker(0, 'keys');

/** @: from :: Input -> Array Allocated Nums */
const { from } = Array;

/** @: fpRange :: N -> List 1..N */
const fpRange = compose(map(add(1)), from, keys, array);

/** @: array :: Input -> String Input  */
const string = construct(String);

/** @: requireRangeExample :: N -> require('./example-'..N) */
const requireRangeExample = compose(
  map(require),
  map(concat('./example-')),
  map(string),
  fpRange,
);

module.exports = requireRangeExample;
