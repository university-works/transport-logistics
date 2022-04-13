const { always } = require('ramda');

const options = { noAck: true };

/** @: receiveFromAmqp :: ...args -> receice */
const receiveFromAmqp = (params) => (receiver, cFns) => (queue) => (fn) =>
  receiver.map(always(cFns.consume(queue, fn, params)));

module.exports = receiveFromAmqp(options);
