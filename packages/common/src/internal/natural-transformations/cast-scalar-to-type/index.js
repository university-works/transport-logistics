/**
 * @cast scalar value(not algebraic) to type one
 */

const { io, toIO } = require('./to-io');
const { toMaybe, maybe } = require('./to-maybe');
const { toEither, either, toEitherSafe } = require('./to-ramda-either');
const {
  futurify,
  toFuture,
  futurifyWithEither,
  cacheFuture,
} = require('./to-future');

const toId = require('./to-id');

module.exports = {
  io,
  toIO,
  toMaybe,
  maybe,
  toEither,
  toEitherSafe,
  either,
  futurify,
  toFuture,
  futurifyWithEither,
  cacheFuture,
  toId,
};
