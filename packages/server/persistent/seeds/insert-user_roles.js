const {
  call,
  map,
  compose,
  prop,
  identity,
  applySpec,
  chain,
} = require('ramda');

const {
  applyCaptureDriver,
  getRandomValueInVector,
} = require('../helpers/index');

const table = 'user_roles';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  const apDriver = applyCaptureDriver(knex);

  const apUsers = apDriver('users', '*');
  const apRoles = apDriver('roles', '*');

  const [users, roles] = await Promise.all(chain(call, [apUsers, apRoles]));

  const apply = applySpec({
    user_id: identity,
    role_id: () => prop('id', getRandomValueInVector(roles)),
  });

  const mapTable = compose(map(apply), map(prop('id')));

  await knex(table).del();
  await knex(table).insert(mapTable(users));
};
