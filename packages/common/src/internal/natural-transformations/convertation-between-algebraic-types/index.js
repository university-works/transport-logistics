/**
 * @convertation between algebraic types with saving values inside
 */

const {
  promiseToFuture,
  promiseToFutureWithParams,
} = require('./promise-to-future');

const arrayToMaybe = require('./arr-to-maybe');
const eitherToFuture = require('./either-to-future');
const eitherToMaybe = require('./either-to-maybe');
const futureToPromise = require('./future-to-promise');
const idToFuture = require('./id-to-future');
const idToIO = require('./id-to-io');
const idToMaybe = require('./id-to-maybe');
const ioToFuture = require('./io-to-future');
const maybeToEither = require('./maybe-to-either');
const maybeToFuture = require('./maybe-to-future');
const {
  wrapEitherInPromise,
  promiseToEither,
} = require('./wrap-either-in-promise');

module.exports = {
  promiseToFuture,
  promiseToFutureWithParams,
  arrayToMaybe,
  eitherToFuture,
  eitherToMaybe,
  futureToPromise,
  idToFuture,
  idToIO,
  idToMaybe,
  ioToFuture,
  maybeToEither,
  maybeToFuture,
  wrapEitherInPromise,
  promiseToEither,
};
