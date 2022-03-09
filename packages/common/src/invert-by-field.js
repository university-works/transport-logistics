const { complement } = require('ramda');
const trueByField = require('./true-by-field');

/** @ invertByField :: complement to trueByField */
const invertByField = complement(trueByField);

module.exports = invertByField;
