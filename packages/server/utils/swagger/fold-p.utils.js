const { reduce, uncurryN } = require('ramda');

const argsCount = 3;

const reducer = (f) => async (promise, item) => f(await promise, await item);
const folding = (f, acc) => reduce(reducer(f), Promise.resolve(acc));

const foldP = uncurryN(argsCount, folding);

module.exports = foldP;
