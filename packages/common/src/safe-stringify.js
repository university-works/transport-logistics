const {
  toEitherSafe,
} = require('./internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

/** @: parse :: JSON -> String  */
const { stringify } = JSON;

/** @: safeParse :: JSON -> Either Left Right String  */
const safeStringify = toEitherSafe(stringify);

module.exports = safeStringify;
