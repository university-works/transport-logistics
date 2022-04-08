const { baseRepository } = require('../services/index');

const userRepository = baseRepository('users');

module.exports = userRepository;
