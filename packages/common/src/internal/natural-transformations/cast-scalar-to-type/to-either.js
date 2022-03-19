const { curry } = require('ramda');

/** @: toEither :: Left Right -> String -> Value -> Either Error Value */
const toEither = (left, right) =>
  curry((errMessage, value) => {
    if (value) return right(value);
    return left(errMessage);
  });

/** @: toEitherSafe :: Left Right -> (a -> b) -> ...a -> Either Error b */
const toEitherSafe =
  (left, right) =>
  (f) =>
  (...value) => {
    try {
      return right(f(...value));
    } catch (err) {
      return left(err);
    }
  };

/** @: toEitherSafeWithDefault :: Left Right -> Message -> (a -> b) -> ...a -> Either Error Message b */
const toEitherSafeWithDefault =
  (left, right) =>
  (onFail, f) =>
  (...value) => {
    try {
      return right(f(...value));
    } catch (err) {
      return left({ onFail, err });
    }
  };

module.exports = { toEither, toEitherSafe, toEitherSafeWithDefault };
