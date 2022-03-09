const { curry } = require('ramda');

/**
 * @make side effect and return passed value to functor
 */

/** @: tap :: Functor -> a */
const tap = curry((f, v) => f(v).map(() => v));

module.exports = tap;
