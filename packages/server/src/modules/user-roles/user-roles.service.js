const { identity } = require('ramda');
const { captureFieldToMap } = require('../../../utils/service/index');
const { userRoleRepository } = require('../../repos/index');

const repository = userRoleRepository.chain(identity);

const meta = {
  onCall: [],
};

const userRoleService = (repository) => {
  const general = captureFieldToMap(repository)('onCall');
  return { ...general(meta), repository };
};

module.exports = userRoleService(repository);
