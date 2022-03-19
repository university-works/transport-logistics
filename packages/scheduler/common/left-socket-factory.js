const { cast } = require('@fp/common');

const { logger } = require('../utils/index');
const { left } = cast;

const leftSocketFactory = (pool, socket) => ({
  onOperationFail: (message) => (either) => {
    logger.error(
      `${message}: onFail: ${either.onFail}, message: ${either.err.message}`,
    );
    pool[socket] = left(either);
    return pool[socket];
  },
  logJustLeft: (message) => (either) => {
    logger.error(message);
    pool[socket] = left({ message, either });
    return pool[socket];
  },
});

module.exports = leftSocketFactory;
