const { compose, not } = require('ramda');
const isEmpty = require('./is-empty.utils');

/** @: notEmpty: value -> boolean */
const notEmpty = compose(not, isEmpty);

module.exports = notEmpty;
