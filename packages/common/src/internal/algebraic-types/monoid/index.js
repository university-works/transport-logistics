/**
 * @monoids allow to perfome safe operations instead of semigroups
 * @ensure failsafe combination using monoids
 */

const sum = require('./sum');
const all = require('./all');

module.exports = { sum, all };
