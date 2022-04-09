const { identity } = require('ramda');
const { captureFieldToMap } = require('../../../utils/service/index');
const { userRepository } = require('../../repos/index');

const repository = userRepository.chain(identity);

const meta = {
  onCall: ['count', 'logAction'],
};

const userService = captureFieldToMap(repository)('onCall');

module.exports = userService(meta);
