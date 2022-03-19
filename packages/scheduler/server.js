const http = require('http');

const setupMq = require('./services/amqp/index');
const setupJobs = require('./services/jobs');

const config = require('./config/config.service');

const { healthCheck, logger } = require('./utils/index');

const server = http.createServer(healthCheck);

server.on('listening', () =>
  logger.info(`Server listening on port ${config.get('PORT')}`),
);

Promise.resolve()
  .then(setupMq)
  .then(setupJobs)
  .then(() => server.listen(config.get('PORT')));

process.on('unhandledRejection', (error) => {
  throw error;
});

process.on('uncaughtException', (error) => {
  throw error;
});
