/** @: (future, task)ToPromise :: Future, Task a b -> Promise a b */
const futureToPromise = (future) =>
  new Promise(
    (resolve, reject) => future.fork(reject, resolve), // eslint-disable-line
  );

module.exports = futureToPromise;
