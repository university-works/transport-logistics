const { compose, call, always } = require('ramda');

/** @: constant :: Value -> Value */
const constant = compose(call, always);

module.exports = constant;
