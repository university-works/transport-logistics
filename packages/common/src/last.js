const { reduce, compose, map, prop } = require('ramda');
const nth = require('./safe-nth');
const { reverse: reverseMonoid } = require('./internal/algebraic-types/monoid');
const constant = require('./constant');

/** @: head :: List -> Either Head */
const head = nth(0);

/** @: reverseOperation :: Reverse Initial, Reverse Next -> Reverse Next Initial */
const reverseOperation = (acc, x) => acc.concat(x);

/** @: reverse :: List -> List */
const reverse = reduce(reverseOperation, reverseMonoid.empty());

/** @: value as constant */
const field = constant('xs');

/** @: last :: List -> Either Error Last */
const last = compose(head, prop(field), reverse, map(reverseMonoid));

module.exports = last;
