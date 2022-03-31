const knex = require('knex');

const { config } = require('../config/index');
const knexfile = require('../knexfile');

const env = config.get('NODE_ENV');
const options = knexfile[env];

module.exports = knex(options);
