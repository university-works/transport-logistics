const { always } = require('ramda');
const config = require('../config/config.service');

const AMQP_USERNAME = config.get('AMQP_USERNAME');
const AMQP_PASSWORD = config.get('AMQP_PASSWORD');
const AMQP_HOSTNAME = config.get('AMQP_HOSTNAME');
const AMQP_PORT = config.get('AMQP_PORT');

const constructAmqpUrl = always(
  `amqp://${AMQP_USERNAME}:${AMQP_PASSWORD}@${AMQP_HOSTNAME}:${AMQP_PORT}`,
);

module.exports = constructAmqpUrl;
