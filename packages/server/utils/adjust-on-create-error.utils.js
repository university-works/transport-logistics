const { compose, chain, identity } = require('ramda');
const { fns } = require('@fp/common');

const createError = require('./create-error.utils');

const { safeStringify } = fns;

/** @: adjustOnCreateError :: message -> value -> table message value */
const adjustOnCreateError = compose(
  chain(identity),
  safeStringify,
  createError,
);

module.exports = adjustOnCreateError;
