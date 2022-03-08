const { Future, Either } = require('ramda-fantasy');
const { curry, compose, prop } = require('ramda');

/** @: futurify :: (a -> b) -> ...a -> Future Error b */
const futurify =
  (f) =>
  (...args) =>
    new Future((reject, resolve) => {
      args.push((err, data) => {
      if (err) return reject(err);
        return resolve(data);
    });
    return f(...args);
    });

/** @: futurifyWithEither :: (a -> b) -> ...a -> Future Either Error b */
const futurifyWithEither =
  (f) =>
  (...args) =>
    new Future((reject, resolve) => {
      args.push((err, data) => {
      if (err) return reject(Either.Left(err));
        return resolve(Either.Right(data));
    });
    return f(...args);
    });

/** @: toFuture :: (field -> object) -> Future Error Object Field Value */
const toFuture = curry(compose(futurify, prop));

module.exports = { futurify, toFuture, futurifyWithEither };
