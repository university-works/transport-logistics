/**
 * @enforce a null check with composable code branching using either;
 * @allows to do:
 * - pure functional error handling
 * - code branching
 * - null checks
 */

/**
 * @Handling if-else condition. Either
 * @: Working with functions throwing an error and exiting at once after error appearance
 *
 * @Eitheir contains of 2 constructors: @Left, @Right - both are Monads
 * @Left    contains error/expection
 * @Right   contains normal result
 *
 * @Either.Left
 * @Either.Right - later we can apply .compose function because this values is valid
 * @Also We can apply .map, .chain methods to them
 *
 * @Either.either takes 3 parameters:
 * - handle on success
 * - handle on error
 * - Monada Either
 * This function is curried so we can pass handlers on success and error. And the Monad EIther pass
 *
 * @How to use
 * 1. Wrap returned value into Left or Right
 * 2. Create 2 functions: on success, on error
 * 3. Use method .chain
 */

const eitherFold = require('./control-flow-with-fold-method');
const eitherUnified = require('./unified-control-flow-with-either-fn');

module.exports = { eitherFold, eitherUnified };
