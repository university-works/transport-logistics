const { converge } = require('ramda');

const createNthVector = converge(Array.from, [Array]);

module.exports = createNthVector;
