const { Either } = require('ramda-fantasy');
const { toEither, toEitherSafe } = require('./to-either');

/** @: toRamdaEither :: ErrMessage -> Value -> Either ErrMessage Value  */
const toRamdaEither = toEither(Either.Left, Either.Right);

/** @: either: fn on Either Left -> fn on Either Right -> Either Left Right */
const { either } = Either;

/** @: toSafeRamdaEither :: (a -> b) -> ...a -> Either Left Right b */
const toSafeRamdaEither = toEitherSafe(Either.Left, Either.Right);

module.exports = {
  toEither: toRamdaEither,
  either,
  toEitherSafe: toSafeRamdaEither,
};
