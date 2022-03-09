const { identity } = require('ramda');
const { IO } = require('ramda-fantasy');

/** @:: idToIO :: Identity a -> IO a  */
const idToIO = (id) => IO(() => id.chain(identity));

module.exports = idToIO;
