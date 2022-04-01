const {
  converge,
  compose,
  length,
  multiply,
  prop,
  identity,
} = require('ramda');

/** @: mulRandToLegth :: n -> mul(n, m) */
const mulRandToLegth = converge(multiply, [Math.random, length]);

/** @: getRandomValueInVector :: vector -> vector[n] */
const getRandomValueInVector = converge(prop, [
  compose(Math.floor, mulRandToLegth),
  identity,
]);

module.exports = getRandomValueInVector;
