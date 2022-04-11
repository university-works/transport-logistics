const { identity } = require('ramda');
const { captureFieldToMap } = require('../../../utils/service/index');
const { roleRepository } = require('../../repos/index');

const repository = roleRepository.chain(identity);

const meta = {
  onCall: ['count'],
};

const roleService = (repository) => {
  const general = captureFieldToMap(repository)('onCall');

  const getByCode = (code) => repository.getByCode({ code });

  const methods = {
    getByCode,
  };

  return { ...general(meta), ...methods, repository };
};

module.exports = roleService(repository);
