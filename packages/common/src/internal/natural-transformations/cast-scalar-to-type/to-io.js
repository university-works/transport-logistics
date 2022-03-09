const { identity, compose } = require('ramda');
const { IO } = require('ramda-fantasy');

/** @: toMaybe :: Identity a -> IO a */
const toIO = IO.of;

/** @: io :: Identity a -> IO a */
const io = compose(IO.of, identity);

module.exports = { io, toIO };
