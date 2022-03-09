const { curry, compose, prop } = require('ramda');

/** @: trueByField :: Field -> Object -> Boolean Object[Field] */
const trueByField = curry(compose(Boolean, prop));

module.exports = trueByField;
