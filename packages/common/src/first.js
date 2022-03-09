const { curry, compose, chain } = require('ramda');

const {
  toEither,
} = require('./internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const {
  maybe,
} = require('./internal/natural-transformations/cast-scalar-to-type/to-maybe');

const maybeToEither = require('./internal/natural-transformations/convertation-between-algebraic-types/maybe-to-either');

const nth = require('./safe-nth');

/** @: first :: List -> Either Left Right List First  */
const first = curry(
  compose(
    toEither('first element is null or undefined'),
    chain(compose(maybeToEither, maybe)),
    nth(0),
  ),
);

module.exports = first;
