const { baseRepository } = require('../services/index');

const scopeRepository = baseRepository('scopes');

module.exports = scopeRepository;
