const { captureCtrlMeta } = require('../../../utils/controller/index');
const scopeService = require('./scope.service');

const meta = {
  onCall: ['count'],
};

const scopeCtrl = captureCtrlMeta(scopeService, 'onCall');

module.exports = scopeCtrl(meta);
