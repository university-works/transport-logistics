const { captureRoutesMeta } = require('../../services/index');
const { userRepository } = require('../../repos/index');

const userCtrl = require('./user.controller');
const userView = require('./user.view');

const key = 'user';

const meta = {
  get: {
    '/count': userCtrl.count,
    '/log-action': userCtrl.logAction,
  },
  post: {},
};

module.exports = captureRoutesMeta(userView, userRepository, key, meta);
