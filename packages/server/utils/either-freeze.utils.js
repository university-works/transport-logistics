const { cast } = require('@fp/common');
const { compose, curry } = require('ramda');

const { toEither } = cast;

/** @: eitherFreeze :: message -> methods -> either left right methods */
const eitherFreeze = (message) =>
  curry(compose(toEither(message), Object.freeze));

module.exports = eitherFreeze;
