const { curry } = require('ramda');

const {
  maybe,
} = require('./internal/natural-transformations/cast-scalar-to-type/to-maybe');

/** @: safePropWithMaybe :: String -> Object -> Maybe Nothing Object[String] */
const safePropWithMaybe = curry((field, o) => maybe(o[field]));

module.exports = safePropWithMaybe;
