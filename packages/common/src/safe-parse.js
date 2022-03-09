const {
  toEitherSafe,
} = require('./internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

/** @: parse :: String -> JSON  */
const { parse } = JSON;

/** @: safeParse :: String -> Either Left Right JSON  */
const safeParse = toEitherSafe(parse);

module.exports = safeParse;
