const { captureRoutesMeta } = require('../../services/index');
const { roleRepository } = require('../../repos/index');

const roleCtrl = require('./role.controller');
const roleView = require('./role.view');

const key = 'role';

const meta = {
  get: {
    '/count': roleCtrl.count,
  },
};

module.exports = captureRoutesMeta(roleView, roleRepository, key, meta);
