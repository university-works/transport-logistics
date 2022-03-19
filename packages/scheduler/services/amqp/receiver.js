const util = require('util');
const { identity, path } = require('ramda');
const eitherFreeze = require('../../utils/either-freeze');
const logger = require('../../utils/logger');

const receiver = (base) => {
  const consume = (channel) =>
    util.promisify((queue, options, cb) =>
      channel.chain(identity).consume(
        queue,
        (message, ...last) => {
          logger.info(`received message: ${message.content.toString()}`);
          return cb(null, message);
        },
        options,
      ),
    );

  const methods = {
    consume: consume(base.chain(path(['pool', 'channel']))),
    ...base.chain(identity),
  };

  return eitherFreeze('methods for receiver can not be not provided')(methods);
};

module.exports = receiver;
