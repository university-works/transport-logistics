const { cast } = require('@fp/common');
const { always } = require('ramda');
const { wrapLogger } = require('../../../../logger/index');

const { either } = cast;

const EMPTY_MESSAGE = {};

/** @: sendToAmqp :: ...args -> publish */
const sendToAmqp =
  (sender, pFns) =>
  (queue) =>
  async (data = EMPTY_MESSAGE) => {
    const publisherEither = await sender.map(
      always(pFns.sendToQueue(queue, data)),
    );
    return either(
      wrapLogger('error', `either left, could not send message ${queue}`),
      wrapLogger('info', `either right, managed to send to queue: ${queue}`),
      publisherEither,
    );
  };

module.exports = sendToAmqp;
