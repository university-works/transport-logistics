const { compose, length, not } = require('ramda');

/** @: isEmpty :: object -> boolean */
const isEmpty = compose(not, length, Object.keys);

module.exports = isEmpty;
