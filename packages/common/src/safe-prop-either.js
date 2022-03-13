const { compose, curry, prop } = require('ramda');

const {
  toEither,
} = require('./internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

/** @: safePropWithEither :: String -> Object -> Either Error Object[String] */
const safePropWithEither = curry(
  compose(toEither('field value should be not null'), prop),
);

module.exports = safePropWithEither;
