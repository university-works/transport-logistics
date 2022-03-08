const { Future } = require('ramda-fantasy');
const { identity } = require('ramda');

/** @: maybeTo(Future, Task) :: Maybe a -> Future, Task () a */
const maybeToFuture = (maybe) =>
  new Future(
  (
    reject,
      resolve, // eslint-disable-line
  ) => (maybe.isNothing ? reject() : resolve(maybe.chain(identity))),
);

module.exports = maybeToFuture;
