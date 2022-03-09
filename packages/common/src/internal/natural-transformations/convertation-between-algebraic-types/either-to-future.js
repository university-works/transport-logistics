const { Either, Future } = require('ramda-fantasy');

/** @: eitherToFuture :: Either a -> Future a */
const eitherToFuture = Either.either(Future.reject, Future.of);

module.exports = eitherToFuture;
