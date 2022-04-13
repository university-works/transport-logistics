const requireModules = require('../../../../utils/require-modules.utils');

const helpers = {
  'construct-amqp-url.helper': 'constructAmqpUrl',
  'left-socket-factory.helper': 'leftSocketFactory',
};

module.exports = requireModules(__dirname)(helpers);
