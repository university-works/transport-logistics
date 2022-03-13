const { IO } = require('ramda-fantasy');

/** @: pureLog :: String -> IO () */
const pureLog = (message) => new IO(() => console.log({ message })); // eslint-disable-line

module.exports = pureLog;
