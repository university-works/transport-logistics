const requireModules = require('../../utils/require-modules.utils');

const subscriptions = {
  'subscriptions/inputs.subscription': 'input',
  'subscriptions/order.subscription': 'order',
  'subscriptions/service.subscription': 'service',
};

module.exports = requireModules(__dirname)(subscriptions);
