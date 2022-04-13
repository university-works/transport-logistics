const { identity, always } = require('ramda');

const base = require('../common/base');
const constructAmqpUrl = require('../helpers/construct-amqp-url.helper');
const receiveFromAmqp = require('./receive-from-amqp');
const receiver = require('./receiver');

/** @: resolveConsumer :: -> send */
const resolveConsumer = async () => {
  const inst = base();
  const iFns = inst.chain(identity);

  const amqpUrl = constructAmqpUrl();

  await inst.chain(always(iFns.connect(amqpUrl)));
  await inst.chain(always(iFns.createChannel()));

  const consumer = receiver(inst);
  const cFns = consumer.chain(identity);

  return receiveFromAmqp(consumer, cFns);
};

module.exports = resolveConsumer;
