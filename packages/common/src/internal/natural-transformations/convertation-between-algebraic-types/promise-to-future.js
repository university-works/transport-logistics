const { Future } = require('ramda-fantasy');
const { construct } = require('ramda');

/** @: promiseTo(Future, Task) :: Promise a b -> Future, Task a b */
const promiseToFuture = (promise) =>
  new Future((reject, resolve) => promise.then(resolve).catch(reject));

/** @: future :: Value -> Future, Task Value */
const future = construct(Future);

/** @: promiseToFutureWithParams(Future, Task) :: (a -> b) -> ...args -> Future, Task b */
const promiseToFutureWithParams =
  (f) =>
  (...args) =>
    future((reject, resolve) =>
      f(...args)
        .then(resolve)
        .catch(reject),
    );

module.exports = { promiseToFuture, promiseToFutureWithParams };
