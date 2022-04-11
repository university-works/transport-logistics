const { identity } = require('ramda');
const { captureFieldToMap } = require('../../../utils/service/index');
const { roleScopeRepository } = require('../../repos/index');

const repository = roleScopeRepository.chain(identity);

const meta = {
  onCall: [],
};

const roleScopeService = captureFieldToMap(repository)('onCall');

module.exports = roleScopeService(meta);
