/**
 * @static method of used to lift a value to a type - generic
 */

/**
 * @law functor(x).map(f) === functor(f).ap(functor(x))
 * @apply multiple args to a function in a generic way(liftN)
 */

const liftA2 = (f, fx, fy) => fx.map(f).ap(fy);
const liftA3 = (f, fx, fy, fz) => fx.map(f).ap(fy).ap(fz);

module.exports = { liftA2, liftA3 };