const { convert, cast } = require('@fp/common');
const amqp = require('amqplib');

const { eitherFreeze, logger } = require('../../utils/index');
const { leftSocketFactory } = require('../../common/index');

const { promiseToEither } = convert;
const { either, toEither } = cast;

const base = () => {
  const pool = {};

  const connect = async (url) => {
    const amqpConnector = promiseToEither(
      'error occured while connection to queue',
      amqp.connect,
    );
    const connector = await amqpConnector(url);

    const onConnectSuccess = (either) => {
      logger.info('connected with success');
      pool.connector = toEither('connector can not be not defined', either);
      return pool.connector;
    };

    const { onOperationFail } = leftSocketFactory(pool, 'connector');

    return either(
      onOperationFail('[failed to connecto to amqp]'),
      onConnectSuccess,
      connector,
    );
  };

  const createChannel = async () => {
    const tryToCreateChannel = async (connector) => {
      const amqpChannel = promiseToEither(
        'error occured while creating channel',
        connector.createChannel.bind(connector),
      );
      const channel = await amqpChannel();

      const onChannelSuccess = (either) => {
        logger.info('channel created with success');
        pool.channel = toEither('channel can not be not defined', either);
        return pool.channel;
      };

      const { onOperationFail } = leftSocketFactory(pool, 'channel');

      return either(
        onOperationFail('[failed to create channel]'),
        onChannelSuccess,
        channel,
      );
    };

    const { logJustLeft } = leftSocketFactory(pool, 'connector');

    return either(
      logJustLeft('failed to get connector'),
      tryToCreateChannel,
      pool.connector,
    );
  };

  const assertQueue = (queue) => {
    const tryToAssertQueue = async (channel) => {
      const amqpAssertQueue = promiseToEither(
        'error occured while assertion queue',
        channel.assertQueue.bind(channel),
      );
      const amqpQueue = await amqpAssertQueue(queue);

      const onQueueAssertionSuccess = (either) => {
        logger.info(`queue asserted with success: ${either.queue}`);
        return toEither('queue can not be undefined', either);
      };

      const { onOperationFail } = leftSocketFactory(pool, 'channel');

      return either(
        onOperationFail('[failed to assert channel queue]'),
        onQueueAssertionSuccess,
        amqpQueue,
      );
    };

    const { logJustLeft } = leftSocketFactory(pool, 'channel');

    return either(
      logJustLeft('failed to create channel'),
      tryToAssertQueue,
      pool.channel,
    );
  };

  const closeChannel = () => {
    const tryToCloseChannel = async (channel) => {
      const amqpCloseChannel = promiseToEither(
        'error occured while closing channel',
        channel.close.bind(channel),
      );
      const close = await amqpCloseChannel();

      const onCloseChannelSuccess = (either) => {
        logger.info('channel closed with success');
        return toEither('channel connector can not be undefined', either);
      };

      const { onOperationFail } = leftSocketFactory(pool, 'channel');

      return either(
        onOperationFail('[failed to close channel]'),
        onCloseChannelSuccess,
        close,
      );
    };

    const { logJustLeft } = leftSocketFactory(pool, 'channel');

    return either(
      logJustLeft('failed to assert queue'),
      tryToCloseChannel,
      pool.channel,
    );
  };

  const closeConnector = async () => {
    const tryToCloseChannel = async (connector) => {
      const amqpCloseConnector = promiseToEither(
        'error occured while closing queue',
        connector.close.bind(connector),
      );
      const closeSocket = await amqpCloseConnector();

      const onCloseQueueSuccess = (either) => {
        logger.info('queue closed with success');
        return toEither('queue connector can not be undefined', either);
      };

      const { onOperationFail } = leftSocketFactory(pool, 'channel');

      return either(
        onOperationFail('[failed to close queue socket]'),
        onCloseQueueSuccess,
        closeSocket,
      );
    };

    const { logJustLeft } = leftSocketFactory(pool, 'connector');

    return either(
      logJustLeft('failed to close channel'),
      tryToCloseChannel,
      pool.connector,
    );
  };

  const methods = {
    connect,
    createChannel,
    assertQueue,
    closeChannel,
    closeConnector,
    pool,
  };

  return eitherFreeze('methods can not be undefined')(methods);
};

module.exports = base;
