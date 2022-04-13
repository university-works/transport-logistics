const requireModules = require('../../../../utils/require-modules.utils');

const helpers = {
  sender: 'sender',
  'send-to-amqp': 'sendToAmqp',
  'resolve-puslisher': 'resolvePuslisher',
};

module.exports = requireModules(__dirname)(helpers);
