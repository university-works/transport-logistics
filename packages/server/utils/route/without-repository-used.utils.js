const { cast } = require('@fp/common');
const { compose, identity, call } = require('ramda');

const { toEither } = cast;

/** @: withoutRepositoryUsed :: string -> virtual repository -> either */
const withoutRepositoryUsed = (message) =>
  call(compose(toEither(message), identity));

console.log({ withoutRepositoryUsed: withoutRepositoryUsed('auth') });

module.exports = withoutRepositoryUsed;
