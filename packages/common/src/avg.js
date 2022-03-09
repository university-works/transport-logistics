const { converge, divide, sum, length } = require('ramda');

/** @: avg :: List -> Average Value in List */
const avg = converge(divide, [sum, length]);

module.exports = avg;
