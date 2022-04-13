const { cast } = require('@fp/common');
const { curry, set, lensProp } = require('ramda');

const { wrapLogger } = require('../../../../logger/index');

const { left } = cast;

/** @: leftSocketFactory :: ...args -> hash table fns */
const leftSocketFactory = curry((logger, pool, socket) => ({
  /** @: onOperationFail :: message -> either -> log */
  onOperationFail: curry((message, either) => {
    logger(
      `${message}: onFail: ${either.onFail}, message: ${either.err.message}`,
    );
    return set(lensProp(socket), left(either), pool);
  }),
  /** @: logJustLeft :: message -> either -> log */
  logJustLeft: curry((message, either) => {
    logger(message);
    return set(lensProp(socket), left({ message, either }), pool);
  }),
}));

module.exports = leftSocketFactory(wrapLogger('error'));
