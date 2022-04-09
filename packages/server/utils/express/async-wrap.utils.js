const { curry, compose, prop } = require('ramda');
const {
  cast: { maybe },
} = require('@fp/common');

const {
  HTTP_STATUS_CODES: { INTERNAL_SERVER_ERROR, OK },
} = require('../../errors/index');

const getOrElse = require('../get-or-else.utils');
const ap = require('./ap.utils');

/** @: asyncWrap :: handler -> req, res, next -> http request status answer */
const asyncWrap = (handler) => async (req, res, next) => {
  const answer = await handler(req, res, next).catch((err) => {
    const toReturn = { path: `${req.baseUrl}${req.path}`, err };

    console.log({ err });

    const wrapWithMaybeOk = compose(
      maybe,
      getOrElse(INTERNAL_SERVER_ERROR),
      maybe,
    );
    const toMaybe = curry(compose(wrapWithMaybeOk, prop));
    const status = toMaybe('status');

    maybe(ap).ap(maybe(res)).ap(status(err)).ap(maybe(toReturn));
  });

  const wrapWithMaybeOk = compose(maybe, getOrElse(OK), maybe);
  const toMaybe = curry(compose(wrapWithMaybeOk, prop));

  const status = toMaybe('status');
  return maybe(ap).ap(maybe(res)).ap(status(req)).ap(maybe(answer));
};

module.exports = asyncWrap;
