const { identity } = require('ramda');

/** @: toId :: F a -> a */
const toId = (functor) => functor.chain(identity);

module.exports = toId;
