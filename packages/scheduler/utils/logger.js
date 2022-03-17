const pino = require('pino');
const { compose, always, curry } = require('ramda');
const { cast } = require('@fp/common');

const config = require('../config/config.service');

const { toEither, either } = cast;

const pretty = curry(
  compose(toEither('PRETTY_LOGS is null or undefined'), config.get),
);
const wrapLogger = curry((logger, prettyPrint) => logger({ prettyPrint }));

const prettyConfig = {
  colorize: true,
  translateTime: true,
  levelFirst: true,
};

const notPrettyConfig = {
  colorize: false,
};

const setLogs = either(always(notPrettyConfig), always(prettyConfig));
const logger = compose(wrapLogger(pino), compose(setLogs, pretty));

module.exports = logger('PRETTY_LOGS');
