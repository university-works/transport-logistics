const { compose, prop } = require('ramda');

/** @: id :: req -> number */
const id = compose(prop('id'), prop('params'));

module.exports = id;
