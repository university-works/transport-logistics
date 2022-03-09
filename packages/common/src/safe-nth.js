const {
  maybe,
} = require('./internal/natural-transformations/cast-scalar-to-type/to-maybe');

/** @: nth -> N -> List -> Maybe Noting List[N]  */
const nth = (n) => (xs) => maybe(xs[n]);

module.exports = nth;
