const { config } = require('./config/index');

module.exports = {
  [config.get('NODE_ENV')]: {
    client: config.get('RDBMS_CLIENT'),
    connection: {
      port: config.get('POSTGRES_PORT'),
      host: config.get('HOST'),
      database: config.get('POSTGRES_DB'),
      user: config.get('POSTGRES_USER'),
      password: config.get('POSTGRES_PASSWORD'),
    },
    migrations: {
      directory: config.get('POSTGRES_MIGRATIONS_DIR'),
    },
    seeds: {
      directory: config.get('POSTGRES_SEEDS_DIR'),
    },
    debug: config.get('POSTGRES_DEBUG'),
  },
};
