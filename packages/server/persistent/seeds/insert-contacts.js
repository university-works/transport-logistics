const { map, applySpec, prop, compose } = require('ramda');
const { generateContact } = require('../../fixtures/index');
const { createNthVector } = require('../../utils/index');
const {
  applyCaptureDriver,
  getRandomValueInVector,
} = require('../helpers/index');

const vector = createNthVector(5);
const table = 'contacts';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  const fillDefault = () => ({});
  const apContacts = compose(generateContact, fillDefault);

  const apDriver = applyCaptureDriver(knex);
  const apAddresses = apDriver('addresses', '*');
  const addresses = await apAddresses().pop();

  const overMap = (entries) => prop('id', getRandomValueInVector(entries));

  const apply = applySpec({
    address_id: () => overMap(addresses),
    first_name: prop('first_name'),
    last_name: prop('last_name'),
    middle_name: prop('middle_name'),
    title: prop('title'),
    suffix: prop('suffix'),
    email_address: prop('email_address'),
    phone_number: prop('phone_number'),
  });

  const mapTable = map(compose(apply, apContacts));

  await knex(table).del();
  await knex(table).insert(mapTable(vector));
};
