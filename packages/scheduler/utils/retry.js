const logger = require('./logger');

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const retryOperation =
  ({ delay, retries }) =>
  async (operation, jobName, data) => {
    logger.info(
      `Job ${jobName} has been executed at ${new Date().toISOString()}`,
    );

    return operation(data).catch(async (reason) => {
      logger.error(
        `Job ${jobName} has been failed with reason: ${reason.message}`,
      );

      if (retries > 0) {
        await wait(delay);
        return retryOperation(operation, { delay, retries: retries - 1 });
      }
      logger.warn(
        `Job ${jobName} is stopped since exceeded maxFailuresCount ${retries}`,
      );
      throw reason;
    });
  };

module.exports = retryOperation;
