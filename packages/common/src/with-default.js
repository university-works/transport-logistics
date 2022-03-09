const { curry } = require('ramda');

/** @: withDefault :: Functor a -> b -> a, b */
const withDefault = curry((functor, v) => functor.join() || v);

module.exports = withDefault;
