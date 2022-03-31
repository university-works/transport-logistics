const { compose, concat, curry } = require('ramda');

/** @: constructMessage :: string -> string -> env string */
const constructMessage = curry(compose(concat('NODE_ENV='), concat));

module.exports = constructMessage;
