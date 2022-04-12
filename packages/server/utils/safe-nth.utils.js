const { cast } = require('@fp/common');
const { curry, compose } = require('ramda');

const { toEither } = cast;

/** @: nth :: N -> List -> List[N] */
const nth = curry((n, xs) => xs[n]);

/** @: safeNth :: N -> List -> Either Message List[N] */
const safeNth = curry(
  compose(toEither('nth element is null or undefined'), nth),
);

module.exports = safeNth;
