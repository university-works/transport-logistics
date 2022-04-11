const { cast } = require('@fp/common');
const { identity } = require('ramda');
const { baseRepository } = require('../services/index');

const { toEither } = cast;

const repositoryName = 'users';

const userRepository = (name) => {
  const base = baseRepository(name).chain(identity);
  const knex = base.knx();
  const { tableName, schema } = base.getMeta();

  const getByEmail = ({ email, fields = ['*'] }, trx = knex) =>
    trx(tableName).withSchema(schema).select(fields).where({ email }).first();

  return toEither('cast user repository to either', { ...base, getByEmail });
};

module.exports = userRepository(repositoryName);
