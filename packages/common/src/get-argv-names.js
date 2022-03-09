const { compose, map, curry } = require('ramda');
const { Future } = require('ramda-fantasy');
const constant = require('./constant');

/** @: argvNamesIndex :: Index -> Index  */
const argvNamesIndex = constant(2);

/** @: wrap :: Value -> Future Value */
const wrap = (value) => new Future((reject, resolve) => resolve(value));

/** @: slice :: N -> Vector -> Vector[N]  */
const slice = curry((n, xs) => xs.slice(n));

/** @: argv: Value (map a -> b) -> Future b */
const argv = compose(map(slice(argvNamesIndex)), wrap);

module.exports = argv;
