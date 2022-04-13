const { always } = require('ramda');
const { config } = require('../../../../config/index');

const AMQP_USERNAME = config.get('AMQP_USERNAME');
const AMQP_PASSWORD = config.get('AMQP_PASSWORD');
const AMQP_HOSTNAME = config.get('AMQP_HOSTNAME');
const AMQP_PORT = config.get('AMQP_PORT');

/** @: constructAmqpUrl :: string */
const constructAmqpUrl = always(
  `amqp://${AMQP_USERNAME}:${AMQP_PASSWORD}@${AMQP_HOSTNAME}:${AMQP_PORT}`,
);

module.exports = constructAmqpUrl;
