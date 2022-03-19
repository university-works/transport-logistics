const { Either } = require('ramda-fantasy');

/** @: wrapEitherInPromise :: (a -> b) -> ...a -> Promise Either Error b */
const wrapEitherInPromise =
  (f) =>
  (...args) =>
    f(...args).then(Either.Right, Either.Left);

/** @: promiseToEither :: Message, (a -> b) -> ...a -> Promise Either Error b */
const promiseToEither =
  (onFail, f) =>
  async (...args) => {
    try {
      return Either.Right(await f(...args));
    } catch (err) {
      console.log({ err });
      return Either.Left({ onFail, err });
    }
  };

module.exports = { wrapEitherInPromise, promiseToEither };
