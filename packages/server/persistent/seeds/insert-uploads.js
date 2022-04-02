const { map, chain, call, applySpec, prop, compose } = require('ramda');
const { generateUpload } = require('../../fixtures/index');
const { createNthVector } = require('../../utils/index');
const {
  applyCaptureDriver,
  getRandomValueInVector,
} = require('../helpers/index');

const vector = createNthVector(50);
const table = 'uploads';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  const fillDefault = () => ({});
  const apUploads = compose(generateUpload, fillDefault);

  const apDriver = applyCaptureDriver(knex);
  const apUsers = apDriver('users', '*');
  const apContacts = apDriver('contacts', '*');

  const [users, contacts] = await Promise.all(
    chain(call, [apUsers, apContacts]),
  );

  const overMap = (entries) => prop('id', getRandomValueInVector(entries));

  const apply = applySpec({
    contact_id: () => overMap(contacts),
    user_id: () => overMap(users),
    name: prop('name'),
    size: prop('size'),
    type: prop('type'),
    upload_date: prop('upload_date'),
    url: prop('url'),
    description: prop('description'),
  });

  const mapTable = map(compose(apply, apUploads));

  await knex(table).del();
  await knex(table).insert(mapTable(vector));
};
