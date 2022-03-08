const { IO } = require('ramda-fantasy');

/** @: idToMaybe :: Identity a -> IO a */
const idToIO = IO.of;

module.exports = idToIO;
