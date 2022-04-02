const { map, applySpec, prop, compose } = require('ramda');
const { generateNote } = require('../../fixtures/index');
const { createNthVector } = require('../../utils/index');
const {
  applyCaptureDriver,
  getRandomValueInVector,
} = require('../helpers/index');

const vector = createNthVector(10);
const table = 'notes';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  const fillDefault = () => ({});
  const apNotes = compose(generateNote, fillDefault);

  const apDriver = applyCaptureDriver(knex);
  const apContacts = apDriver('contacts', '*');
  const contacts = await apContacts().pop();

  const overMap = (entries) => prop('id', getRandomValueInVector(entries));

  const apply = applySpec({
    contact_id: () => overMap(contacts),
    note: prop('note'),
  });

  const mapTable = map(compose(apply, apNotes));

  await knex(table).del();
  await knex(table).insert(mapTable(vector));
};
