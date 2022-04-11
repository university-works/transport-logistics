const { baseRepository } = require('../services/index');

const roleScopeRepository = baseRepository('role_scopes');

module.exports = roleScopeRepository;
