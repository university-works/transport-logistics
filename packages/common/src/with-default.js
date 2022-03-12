const { curry, identity } = require('ramda');

/** @: withDefault :: Functor a -> b -> a, b */
const withDefault = curry((functor, v) => functor.chain(identity) || v);

module.exports = withDefault;
