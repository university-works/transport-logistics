const { compose, construct, identity } = require('ramda');
const { Future } = require('ramda-fantasy');

/**
 * @wrap value in minimal algebraic type context, means static of fn
 */

/** @: wrapInFuture :: Value -> Future Error Value */
const wrapInFuture = compose(construct(Future.of), identity);

module.exports = wrapInFuture;
