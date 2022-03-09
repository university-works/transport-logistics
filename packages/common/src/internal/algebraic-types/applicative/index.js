/**
 * @lift value to a any algebraic type(e.g: maybe, future, identity, either, task, io) - generic one
 * @lifted fn can be curried and fn inside functor must be one, because of
 * @appliying args inside functors
 *
 * @used interchangeably with applicative functors:
 * - fn: x => y => x * y, v1 = 2, v2 = 4
 * - lift(fn, g(v1), g(v2)) - g is a functor
 * - g(fn).ap(g(v1)).ap(v2) - ap applies value inside functor to fn function
 */

/**
 * @Maybe has method .ap so it is also Applicative Functor
 *
 * @How to use:
 * 1. Wrap null-values in Monad Maybe
 * 2. Curry function, that takes potentially null values
 * 3. send via .map first argument (potentially null value wrapped by Maybe).
 *     as result we will get function wrapped on Monada Maybe
 * 4. .map is not used here, use .ap
 */

const { liftA2, liftA3 } = require('./applicative-functors-for-multiple-args');

module.exports = { liftA2, liftA3 };
