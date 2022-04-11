const { baseRepository } = require('../services/index');

const userRoleRepository = baseRepository('user_roles');

module.exports = userRoleRepository;
