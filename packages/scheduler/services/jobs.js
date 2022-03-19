const { CronJob } = require('cron');

const { always, identity, compose, map } = require('ramda');
const { cast } = require('@fp/common');

const { either } = cast;

const sender = require('./amqp/sender');
const base = require('./amqp/base');
const config = require('../config/config.service');

const {
  logger,
  wrap,
  retryOperation,
  getFirstKey,
  toBuffer,
} = require('../utils/index');

const { constructAmqpUrl } = require('../common/index');

const AMQP_QUEUE_NOTIFY_CUSTOMERS = config.get('AMQP_QUEUE_NOTIFY_CUSTOMERS');
const AMQP_QUEUE_GENERATE_REMINDERS = config.get(
  'AMQP_QUEUE_GENERATE_REMINDERS',
);
const AMQP_QUEUE_REQUEST_SETTLEMENTS = config.get(
  'AMQP_QUEUE_REQUEST_SETTLEMENTS',
);
const AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS = config.get(
  'AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS',
);
const AMQP_QUEUE_END_SUBSCRIPTIONS = config.get('AMQP_QUEUE_END_SUBSCRIPTIONS');
const AMQP_QUEUE_UPDATE_PRICE_GROUPS = config.get(
  'AMQP_QUEUE_UPDATE_PRICE_GROUPS',
);
const AMQP_QUEUE_DYNAMIC_EVENT_PATTERN = config.get(
  'AMQP_QUEUE_DYNAMIC_EVENT_PATTERN',
);
const AMQP_QUEUE_LOCK_BANK_DEPOSITS = config.get(
  'AMQP_QUEUE_LOCK_BANK_DEPOSITS',
);
const AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME',
);
const AMQP_QUEUE_GENERATE_REMINDERS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_GENERATE_REMINDERS_SCHEDULED_TIME',
);
const AMQP_QUEUE_REQUEST_SETTLEMENTS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_REQUEST_SETTLEMENTS_SCHEDULED_TIME',
);
const AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS_SCHEDULED_TIME',
);
const AMQP_QUEUE_RECURRENT_ORDERS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_RECURRENT_ORDERS_SCHEDULED_TIME',
);
const AMQP_QUEUE_FREQUENCY_PRORATION = config.get(
  'AMQP_QUEUE_FREQUENCY_PRORATION',
);
const AMQP_QUEUE_FREQUENCY_PRORATION_PATTERN = config.get(
  'AMQP_QUEUE_FREQUENCY_PRORATION_PATTERN',
);
const AMQP_QUEUE_LOCK_BANK_DEPOSITS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_LOCK_BANK_DEPOSITS_SCHEDULED_TIME',
);
const AMQP_QUEUE_END_SUBSCRIPTIONS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_END_SUBSCRIPTIONS_SCHEDULED_TIME',
);
const AMQP_QUEUE_UPDATE_PRICE_GROUPS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_UPDATE_PRICE_GROUPS_SCHEDULED_TIME',
);
const AMQP_QUEUE_RECURRENT_ORDERS_TO_CORE = config.get(
  'AMQP_QUEUE_RECURRENT_ORDERS_TO_CORE',
);
const AMQP_QUEUE_DAILY_ROUTES_GENERATION = config.get(
  'AMQP_QUEUE_DAILY_ROUTES_GENERATION',
);
const AMQP_QUEUE_DAILY_ROUTES_GENERATION_PATTERN = config.get(
  'AMQP_QUEUE_DAILY_ROUTES_GENERATION_PATTERN',
);
const AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION = config.get(
  'AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION',
);
const AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION_SCHEDULED_TIME =
  config.get(
    'AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION_SCHEDULED_TIME',
  );

const DEFAULT_TIME_ZONE = 'UTC';
const EMPTY_MESSAGE = {};

const log = (message, key) => async (either) =>
  logger[key](`${message} - ${(await either).chain(identity)}`);

const sendToMq =
  (sender, pFns) =>
  (queue) =>
  async (data = EMPTY_MESSAGE) => {
    const publisherEither = await sender.map(
      always(pFns.sendToQueue(queue, data)),
    );
    return either(
      log(`either left, could not send message ${queue}`, 'error'),
      log(`either right, managed to send to queue: ${queue}`, 'info'),
      publisherEither,
    );
  };

const resolvePuslisher = async () => {
  const inst = base();
  const iFns = inst.chain(identity);

  const amqpUrl = constructAmqpUrl();

  await inst.chain(always(iFns.connect(amqpUrl)));
  await inst.chain(always(iFns.createChannel()));

  const publisher = sender(inst);
  const pFns = publisher.chain(identity);

  return sendToMq(publisher, pFns);
};

const setupJobs = async () => {
  const send = await resolvePuslisher();

  const apQueue = (queue) => send(queue);

  const saveQueueName = ({ queue, params }) => ({
    [queue]: apQueue(queue),
    params,
  });

  const composeBuffer = (record) => {
    const queue = getFirstKey(record);
    return {
      ...record,
      [queue]: compose(record[queue], toBuffer),
    };
  };

  const retryDelay = 1000;
  const maxFailuresCount = 2;
  const maxAllowedGapInMins = 10;

  const queues = [
    {
      queue: AMQP_QUEUE_NOTIFY_CUSTOMERS,
      params: {
        targetTime: AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME,
        maxAllowedGapInMins,
      },
    },
    {
      queue: AMQP_QUEUE_GENERATE_REMINDERS,
      params: {
        targetTime: AMQP_QUEUE_GENERATE_REMINDERS_SCHEDULED_TIME,
        maxAllowedGapInMins,
      },
    },
    {
      queue: AMQP_QUEUE_REQUEST_SETTLEMENTS,
      params: {
        targetTime: AMQP_QUEUE_REQUEST_SETTLEMENTS_SCHEDULED_TIME,
        maxAllowedGapInMins,
      },
    },
    {
      queue: AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS,
      params: {
        targetTime: AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS_SCHEDULED_TIME,
        maxAllowedGapInMins,
      },
    },
    {
      queue: AMQP_QUEUE_FREQUENCY_PRORATION,
      params: {
        targetTime: AMQP_QUEUE_FREQUENCY_PRORATION_PATTERN,
      },
    },
    {
      queue: AMQP_QUEUE_UPDATE_PRICE_GROUPS,
      params: {
        targetTime: AMQP_QUEUE_UPDATE_PRICE_GROUPS_SCHEDULED_TIME,
        maxAllowedGapInMins,
      },
    },
    {
      queue: AMQP_QUEUE_LOCK_BANK_DEPOSITS,
      params: {
        targetTime: AMQP_QUEUE_LOCK_BANK_DEPOSITS_SCHEDULED_TIME,
        maxAllowedGapInMins,
      },
    },
    {
      queue: AMQP_QUEUE_END_SUBSCRIPTIONS,
      params: {
        targetTime: AMQP_QUEUE_END_SUBSCRIPTIONS_SCHEDULED_TIME,
        maxAllowedGapInMins,
      },
    },
    {
      queue: AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION,
      params: {
        targetTime:
          AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION_SCHEDULED_TIME,
        maxAllowedGapInMins,
      },
    },
    {
      queue: AMQP_QUEUE_RECURRENT_ORDERS_TO_CORE,
      params: {
        targetTime: AMQP_QUEUE_RECURRENT_ORDERS_SCHEDULED_TIME,
        maxAllowedGapInMins,
      },
    },
    {
      queue: AMQP_QUEUE_DAILY_ROUTES_GENERATION,
      params: {
        targetTime: AMQP_QUEUE_DAILY_ROUTES_GENERATION_PATTERN,
      },
    },
  ];

  const captureRetryOps = retryOperation({
    delay: retryDelay,
    retries: maxFailuresCount,
  });

  const constructJobs = (record) => {
    const queue = getFirstKey(record);

    return new CronJob(
      record.params.targetTime,
      wrap(captureRetryOps, record[queue], queue, record.params),
      DEFAULT_TIME_ZONE,
    ).start();

    /**
     * @in case of setInterval usage:
     *
     * @return setInterval(
     *    wrap(captureRetryOps, record[queue], queue, record.params),
     *    1000
     *  );
     */
  };

  return map(compose(constructJobs, composeBuffer, saveQueueName))(queues);
};

module.exports = setupJobs;
