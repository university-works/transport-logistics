const { baseRepository } = require('../services/index');

const stateRepository = baseRepository('states');

module.exports = stateRepository;
