const { identity } = require('ramda');
const { captureFieldToMap } = require('../../../utils/service/index');
const { stateRepository } = require('../../repos/index');

const repository = stateRepository.chain(identity);

const meta = {
  onCall: ['count', 'logAction', 'logEntity'],
};

const stateService = captureFieldToMap(repository)('onCall');

module.exports = stateService(meta);
