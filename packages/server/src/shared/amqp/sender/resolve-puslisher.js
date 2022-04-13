const { identity, always } = require('ramda');

const base = require('../common/base');
const constructAmqpUrl = require('../helpers/construct-amqp-url.helper');
const sendToAmqp = require('./send-to-amqp');
const sender = require('./sender');

/** @: resolvePuslisher :: -> send */
const resolvePuslisher = async () => {
  const inst = base();
  const iFns = inst.chain(identity);

  const amqpUrl = constructAmqpUrl();

  await inst.chain(always(iFns.connect(amqpUrl)));
  await inst.chain(always(iFns.createChannel()));

  const publisher = sender(inst);
  const pFns = publisher.chain(identity);

  return sendToAmqp(publisher, pFns);
};

module.exports = resolvePuslisher;
