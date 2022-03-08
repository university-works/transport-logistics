/**
 * @fold is trigger for lazyFunctor
 */

const lazyFunctor = (g) => ({
  map: (f) => lazyFunctor(() => f(g())),
  fold: (f) => f(g()),
  inspect: () => `lazyFunctor(${g})`,
});

/**
 * @difference between functor and lazy functor is:
 * - initial value:
 *   > functor     - just value
 *   > lazyFunctor - fn
 * - flow:
 *   > functor     - starts at once
 *   > lazyFunctor - should call method fold that call init fn and map all next fns
 */

module.exports = lazyFunctor;
