/**
 * @linear flow with container style types
 * @capture each assignment in minimal context(each fn in map)
 * @keep mapping and folding, composing different ways around id
 *
 * @nested functors: .fold.map === .map.fold
 */

/**
 * @monadic interface
 *
 * @of and @chain(flatMap, bind, >>=, pure) creates monadic interface
 * @key point monads allow us to nest computation
 */

const identity = require('./linear-flow-with-container-style-types');

module.exports = { identity };
