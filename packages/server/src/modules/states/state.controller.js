const { identity } = require('ramda');
const { asyncWrap } = require('../../../utils/express/index');
const { stateRepository } = require('../../repos/index');

const repository = stateRepository.chain(identity);

const getAll = asyncWrap(async (req, res) => repository.getAll());

const create = asyncWrap(async (req, res) => {
  const { body } = req;
  return repository.createOne({ data: body });
});

module.exports = { getAll, create };
