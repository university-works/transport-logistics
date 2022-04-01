const { converge } = require('ramda');

/** @: createNthVector :: n -> vector n */
const createNthVector = converge(Array.from, [Array]);

module.exports = createNthVector;
