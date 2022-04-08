const { omit, keys, compose, curry } = require('ramda');

/** @: columns: omit -> entity -> vector omited fields */
const columns = curry(compose(keys, omit));

module.exports = columns;
