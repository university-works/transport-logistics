const { curry, compose, prop } = require('ramda');

/** @: toParams :: fn -> args -> fn(args) */
const toParams = curry((fn, args) => fn(args));

/** @: callOnProp :: prop -> obj -> (a -> b) -> call obj[prop], params */
const callOnProp = curry(compose(toParams, prop));

module.exports = callOnProp;
