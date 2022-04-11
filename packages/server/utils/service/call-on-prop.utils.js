const { curry, compose, always, call, prop } = require('ramda');

// /** @: callOnProp :: prop -> obj -> call obj[prop] */
// const callOnProp = curry(compose(always, call, prop));

// /** @: callOnProp :: prop -> obj -> call obj[prop] */
// const callOnProp = curry((field, repository, params) => {
//   //
//   const fn = repository[field];
//   return fn(params);
// });

// /** @: callOnProp :: prop -> obj -> call obj[prop] */
// const callOnProp = curry((field, repository, params) => {
//   //
//   const fn = repository[field];
//   return fn(params);
// });

/** @: toParams :: fn -> args -> fn(args) */
const toParams = curry((fn, args) => fn(args));

/** @: callOnProp :: prop -> obj -> (a -> b) -> call obj[prop], params */
const callOnProp = curry(compose(toParams, prop));

// /** @: callOnProp :: prop -> obj -> call obj[prop] */
// const callOnProp = curry(compose(always, toParams, prop));

module.exports = callOnProp;
