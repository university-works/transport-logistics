const { cast } = require('@fp/common');
const { compose, curry } = require('ramda');

const { toEither } = cast;

const eitherFreeze = (message) =>
  curry(compose(toEither(message), Object.freeze));

module.exports = eitherFreeze;
