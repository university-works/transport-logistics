const { identity } = require('ramda');
const { captureFieldToMap } = require('../../../utils/service/index');
const { scopeRepository } = require('../../repos/index');

const repository = scopeRepository.chain(identity);

const meta = {
  onCall: ['count'],
};

const scopeService = captureFieldToMap(repository)('onCall');

module.exports = scopeService(meta);
