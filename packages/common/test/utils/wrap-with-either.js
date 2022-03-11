const { curry, compose } = require('ramda');

const {
  toEither,
} = require('../../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

/** @: wrapWithEither :: Message -> Fn -> Either Message Fn R */
const wrapWithEither = curry((message, fn) =>
  curry(compose(toEither(message)), fn),
);

module.exports = wrapWithEither;
