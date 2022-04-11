const { map, prop, compose, applySpec } = require('ramda');
const { generateUser } = require('../../fixtures/index');
const { createNthVector } = require('../../utils/index');

const {
  applyCaptureDriver,
  getRandomValueInVector,
} = require('../helpers/index');

const vector = createNthVector(4);
const table = 'users';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  const fillDefault = () => ({});
  const apUsers = compose(generateUser, fillDefault);

  const apDriver = applyCaptureDriver(knex);
  const apContacts = apDriver('contacts', '*');
  const contacts = await apContacts().pop();

  const overMap = (entries) => prop('id', getRandomValueInVector(entries));

  const apply = applySpec({
    contact_id: () => overMap(contacts),
    name: prop('name'),
    password: prop('password'),
    last_login: prop('last_login'),
    email: prop('email'),
  });

  const mapTable = map(compose(apply, apUsers));

  await knex(table).del();
  await knex(table).insert(mapTable(vector));
};
