const { Either } = require('ramda-fantasy');
const {
  toEither,
  toEitherSafe,
  toEitherSafeWithDefault,
} = require('./to-either');

/** @: toRamdaEither :: ErrMessage -> Value -> Either ErrMessage Value  */
const toRamdaEither = toEither(Either.Left, Either.Right);

/** @: either: fn on Either Left -> fn on Either Right -> Either Left Right */
const { either } = Either;

/** @: toSafeRamdaEither :: (a -> b) -> ...a -> Either Left Right b */
const toSafeRamdaEither = toEitherSafe(Either.Left, Either.Right);

/** @: toSafeRamdaEitherWithDefault :: (a -> b) -> ...a -> Either Left Right b */
const toSafeRamdaEitherWithDefault = toEitherSafeWithDefault(
  Either.Left,
  Either.Right,
);

/** @: left :: Value -> Either Left Value */
const left = Either.Left;

module.exports = {
  left,
  toEither: toRamdaEither,
  either,
  toEitherSafe: toSafeRamdaEither,
  toEitherSafeWithDefault: toSafeRamdaEitherWithDefault,
};
