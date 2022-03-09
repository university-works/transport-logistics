const { compose, curry, prop } = require('ramda');

const {
  toEither,
} = require('./internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const {
  maybe,
} = require('./internal/natural-transformations/cast-scalar-to-type/to-maybe');

/** @: safePropWithMaybe :: String -> Object -> Maybe Nothing Object[String] */
const safePropWithMaybe = curry((field, o) => maybe(o[field]));

/** @: safePropWithEither :: String -> Object -> Either Error Object[String] */
const safePropWithEither = curry(
  compose(toEither('field value should be not null'), prop),
);

module.exports = { safePropWithMaybe, safePropWithEither };
