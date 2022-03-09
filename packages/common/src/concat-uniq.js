const { compose, equals, filter, curry, head, always } = require('ramda');

const {
  toEither,
  either,
} = require('./internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

/** @: getHeadWithFilter :: Value -> List -> List Head Null */
const getHeadWithFilter = (x) => compose(head, filter(equals(x)));

/** @: safeGetHeadWithFilter :: Value -> List -> Either Left Right List Head */
const safeGetHeadWithFilter = curry(
  compose(toEither('head is null or undefined'), getHeadWithFilter),
);

/** @: eitherList :: Value -> Either Left ErrMessage Right */
const eitherList = toEither('list is null');

/** @: ap :: Value -> List -> Either Left Right List Head */
const ap = (x, list) =>
  safeGetHeadWithFilter(x).ap(eitherList(list)).chain(toEither(x));

/** @: onHeadNull :: List -> Value -> List Value  */
const onHeadNull = (list) => (x) => list.concat(x);

/** @: concatUniq :: Value List -> Either Left Right List */
const concatUniq = (x, list) =>
  either(onHeadNull(list), always(list), ap(x, list));

module.exports = concatUniq;
