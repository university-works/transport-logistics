/**
 * @capture evaluation, side effects inside container and handle flow with fold method
 */

/**
 * @also before run we can extend our computation in(.map, .chain methods)
 * @it useful because if we have some lib code, keep extending things(app)
 * @and composing along and our whole app remains pure(because launch starts it)
 */

const lazyFunctor = require('./delay-evaluation-with-lazy-functor');

module.exports = lazyFunctor;
