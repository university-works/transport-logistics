const requireModules = require('../../../../utils/require-modules.utils');

const helpers = {
  receiver: 'receiver',
  'receive-from-amqp': 'receiveFromAmqp',
  'resolve-consumer': 'resolveConsumer',
};

module.exports = requireModules(__dirname)(helpers);
