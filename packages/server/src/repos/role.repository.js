const { cast } = require('@fp/common');
const { identity } = require('ramda');
const { baseRepository } = require('../services/index');

const { toEither } = cast;

const repositoryName = 'roles';

const roleRepository = (name) => {
  const base = baseRepository(name).chain(identity);
  const knex = base.knx();
  const { tableName, schema } = base.getMeta();

  const getByCode = ({ code, fields = ['*'] }, trx = knex) =>
    trx(tableName).withSchema(schema).select(fields).where({ code }).first();

  return toEither('cast role repository to either', { ...base, getByCode });
};

module.exports = roleRepository(repositoryName);
