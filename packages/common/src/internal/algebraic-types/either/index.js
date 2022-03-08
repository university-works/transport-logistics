/**
 * @enforce a null check with composable code branching using either;
 * @allows to do:
 * - pure functional error handling
 * - code branching
 * - null checks
 */

const eitherFold = require('./control-flow-with-fold-method');
const eitherUnified = require('./unified-control-flow-with-either-fn');

module.exports = { eitherFold, eitherUnified };
