const { converge, divide, sum, length, compose } = require('ramda');

const {
  toEither,
} = require('./internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

/** @: avg :: List -> Average Value in List */
const avg = compose(
  toEither('value in list are not integer or float types'),
  converge(divide, [sum, length]),
);

module.exports = avg;
