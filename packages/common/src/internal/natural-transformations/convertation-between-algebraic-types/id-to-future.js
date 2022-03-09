const { Future } = require('ramda-fantasy');

/** @: idToFuture :: Identity a -> Future a  */
const idToFuture = (id) => Future.of(id.join());

module.exports = idToFuture;
