const { baseRepository } = require('../services/index');

const schedulerLogRepository = baseRepository('scheduler_logs');

module.exports = schedulerLogRepository;
