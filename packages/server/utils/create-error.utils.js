const { curry } = require('ramda');

/** @: createError :: message -> field -> table */
const createError = curry((message, property) => ({
  message,
  property,
}));

module.exports = createError;
