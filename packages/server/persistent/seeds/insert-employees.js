const { map, chain, call, applySpec, prop, compose } = require('ramda');
const { generateEmployee } = require('../../fixtures/index');
const { createNthVector } = require('../../utils/index');
const {
  applyCaptureDriver,
  getRandomValueInVector,
} = require('../helpers/index');

const vector = createNthVector(50);
const table = 'employees';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  const fillDefault = () => ({});
  const apEmployees = compose(generateEmployee, fillDefault);

  const apDriver = applyCaptureDriver(knex);
  const apContacts = apDriver('contacts', '*');
  const apStates = apDriver('statuses', '*');

  const [contacts, statuses] = await Promise.all(
    chain(call, [apContacts, apStates]),
  );

  const overMap = (entries) => prop('id', getRandomValueInVector(entries));

  const apply = applySpec({
    contact_id: () => overMap(contacts),
    status_id: () => overMap(statuses),
    job_title: prop('job_title'),
    birth_date: prop('birth_date'),
    interview_date: prop('interview_date'),
    hire_date: prop('hire_date'),
  });

  const mapTable = map(compose(apply, apEmployees));

  await knex(table).del();
  await knex(table).insert(mapTable(vector));
};
