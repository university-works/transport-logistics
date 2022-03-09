/** @: trace :: Message -> Value -> Log Value, Value  */
const trace = (message) => (value) => (console.log({ message, value }), value); // eslint-disable-line

module.exports = trace;
