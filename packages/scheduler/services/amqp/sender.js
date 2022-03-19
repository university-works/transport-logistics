const { identity, path } = require('ramda');
const { convert } = require('@fp/common');
const eitherFreeze = require('../../utils/either-freeze');

const { promiseToEither } = convert;

const sender = (base) => {
  const sendToQueue = (channel) => async (queue, data) => {
    const amqpChannel = channel.chain(identity);

    const amqpAssertQueue = promiseToEither(
      'error occured while sending message to queue',
      amqpChannel.sendToQueue.bind(amqpChannel),
    );
    return amqpAssertQueue(queue, Buffer.from(data));
  };

  const methods = {
    sendToQueue: sendToQueue(base.chain(path(['pool', 'channel']))),
    ...base.chain(identity),
  };

  return eitherFreeze('methods for receiver can not be not provided')(methods);
};

module.exports = sender;
