const { identity, always } = require('ramda');

const base = require('./base');
const logger = require('../../utils/logger');
const config = require('../../config/config.service');

const { constructAmqpUrl } = require('../../common/index');

const AMQP_QUEUE_GENERATE_REMINDERS = config.get(
  'AMQP_QUEUE_GENERATE_REMINDERS',
);
const AMQP_QUEUE_REQUEST_SETTLEMENTS = config.get(
  'AMQP_QUEUE_REQUEST_SETTLEMENTS',
);
const AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS = config.get(
  'AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS',
);
const AMQP_QUEUE_LOCK_BANK_DEPOSITS = config.get(
  'AMQP_QUEUE_LOCK_BANK_DEPOSITS',
);
const AMQP_QUEUE_UPDATE_PRICE_GROUPS = config.get(
  'AMQP_QUEUE_UPDATE_PRICE_GROUPS',
);
const AMQP_QUEUE_RECURRENT_ORDERS_TO_CORE = config.get(
  'AMQP_QUEUE_RECURRENT_ORDERS_TO_CORE',
);
const AMQP_QUEUE_NOTIFY_CUSTOMERS = config.get('AMQP_QUEUE_NOTIFY_CUSTOMERS');
const AMQP_QUEUE_END_SUBSCRIPTIONS = config.get('AMQP_QUEUE_END_SUBSCRIPTIONS');

const queuesMap = {
  AMQP_QUEUE_NOTIFY_CUSTOMERS,
  AMQP_QUEUE_GENERATE_REMINDERS,
  AMQP_QUEUE_REQUEST_SETTLEMENTS,
  AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS,
  AMQP_QUEUE_LOCK_BANK_DEPOSITS,
  AMQP_QUEUE_END_SUBSCRIPTIONS,
  AMQP_QUEUE_UPDATE_PRICE_GROUPS,
  AMQP_QUEUE_RECURRENT_ORDERS_TO_CORE,
};

const logError = (err) => logger.error(err);

const setupMq = async () => {
  const inst = base();
  const iFns = inst.chain(identity);

  const amqpUrl = constructAmqpUrl();

  await inst.chain(always(iFns.connect(amqpUrl)));
  await inst.chain(always(iFns.createChannel()));

  const assert = (queue) => inst.chain(always(iFns.assertQueue(queue)));

  await Promise.all(Object.values(queuesMap).map(assert));

  await inst.chain(always(iFns.closeChannel())).catch(logError);
  await inst.chain(always(iFns.closeConnector())).catch(logError);
  return logger.info('MQ: Setup is done');
};

module.exports = setupMq;
