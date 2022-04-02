const { map, applySpec, prop, compose, chain, call } = require('ramda');
const { generateDriver } = require('../../fixtures/index');
const { createNthVector } = require('../../utils/index');
const {
  applyCaptureDriver,
  getRandomValueInVector,
} = require('../helpers/index');

const vector = createNthVector(5);
const table = 'drivers';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  const fillDefault = () => ({});
  const apDrivers = compose(generateDriver, fillDefault);

  const apDriver = applyCaptureDriver(knex);
  const apEmployees = apDriver('employees', '*');
  const apDriverTypes = apDriver('driver_types', '*');
  const apRatings = apDriver('ratings', '*');

  const [employees, driverTypes, ratings] = await Promise.all(
    chain(call, [apEmployees, apDriverTypes, apRatings]),
  );

  const overMap = (entries) => prop('id', getRandomValueInVector(entries));

  const apply = applySpec({
    driver_type_id: () => overMap(driverTypes),
    rating_id: () => overMap(ratings),
    employee_id: () => overMap(employees),
  });

  const mapTable = map(compose(apply, apDrivers));

  await knex(table).del();
  await knex(table).insert(mapTable(vector));
};
