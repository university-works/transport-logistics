const { compose, not } = require('ramda');

/** @: toBoolean:: value -> boolean */
const toBoolean = compose(not, not);

module.exports = toBoolean;
