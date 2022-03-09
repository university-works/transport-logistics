const { Future } = require('ramda-fantasy');

/** @: ioTo(Future, Task) :: IO a -> Future, Task () a */
const ioToFuture = (io) => new Future((reject, resolve) => resolve(io.runIO()));

module.exports = ioToFuture;
