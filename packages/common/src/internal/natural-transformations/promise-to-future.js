const { Future } = require('ramda-fantasy');

/** @: promiseTo(Future, Task) :: Promise a b -> Future, Task a b */
const promiseToFuture = (promise) =>
  new Future((reject, resolve) => promise.then(resolve).catch(reject));

module.exports = promiseToFuture;
