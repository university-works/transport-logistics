const { listCommandsWithEnv } = require('../tools/index');

const docker =
  'docker-compose --env-file .env.<env name e.g: development> up -d';

const commandsWithEnv = {
  latest: ' knex migrate:latest',
  rollback: ' knex migrate:rollback',
  migrationMake: ' knex migrate:make <name>',
  migration: ' knex migrate:<up, down> <filename>.js',
  seedMake: ' knex seed:make <name>',
  seedRun: ' knex seed:run',
  seedOneRun: ' knex seed:run --specific=<filename>.js',
};

const commands = listCommandsWithEnv(commandsWithEnv);

module.exports = commands;
