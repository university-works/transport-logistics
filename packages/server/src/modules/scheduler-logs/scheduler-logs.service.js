const { identity } = require('ramda');
const { schedulerLogRepository } = require('../../repos/index');

const repository = schedulerLogRepository.chain(identity);

const schedulerLogService = (repository) => repository;

module.exports = schedulerLogService(repository);
