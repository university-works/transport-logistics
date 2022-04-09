const { captureCtrlMeta } = require('../../../utils/controller/index');
const stateService = require('./state.service');

const meta = {
  onCall: ['count', 'logAction', 'logEntity'],
};

const stateCtrl = captureCtrlMeta(stateService, 'onCall');

module.exports = stateCtrl(meta);
