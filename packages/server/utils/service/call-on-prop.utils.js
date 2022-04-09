const { curry, compose, always, call, prop } = require('ramda');

/** @: callOnProp :: prop -> obj -> call obj[prop] */
const callOnProp = curry(compose(always, call, prop));

module.exports = callOnProp;
