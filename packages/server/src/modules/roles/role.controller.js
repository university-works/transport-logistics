const { captureCtrlMeta } = require('../../../utils/controller/index');
const roleService = require('./role.service');

const meta = {
  onCall: ['count'],
};

const roleCtrl = captureCtrlMeta(roleService, 'onCall');

module.exports = roleCtrl(meta);
