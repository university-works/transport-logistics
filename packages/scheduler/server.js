const http = require('http');

// import { setupMq } from './services/amqp/index.js';
// import { setupJobs } from './services/jobs.js';

// import healthCheck from './utils/healthCheck.js';
// import { logger } from './utils/logger.js';

const config = require('./config/config.service');

const healthCheck = require('./utils/health-check');
const logger = require('./utils/logger');

// import { PORT } from './config.js';

const server = http.createServer(healthCheck);

server.on(
  'listening',
  () => logger.info(`Server listening on port ${config.get('PORT')}`),
  //   console.log(`Server listening on port ${config.get('PORT')}`),
);

Promise.resolve()
  //   .then(setupMq)
  //   .then(setupJobs)
  .then(() => server.listen(config.get('PORT')));

process.on('unhandledRejection', (error) => {
  console.log({ error });
  //   logger.error(error, 'Unhandled rejection');
  throw error;
});

process.on('uncaughtException', (error) => {
  console.log({ error });
  //   logger.error(error, 'Uncaught exception');
  throw error;
});
