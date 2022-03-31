const { compose, reduce, concat, curry, lensProp, set } = require('ramda');

/** @: requirePath :: path -> prefix -> require(module-path) */
const requirePath = curry(compose(require, concat));

/** @: base :: main -> acc, path, fn -> assoc acc fn path */
const base =
  (main) =>
  (acc, [path, fn]) =>
    set(lensProp(fn), requirePath(concat(main, '/'), path), acc);

/** @: requireModules :: path -> object -> hash table fns */
const requireModules = (main) =>
  compose(reduce(base(main), {}), Object.entries);

module.exports = requireModules;
