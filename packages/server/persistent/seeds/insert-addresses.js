const { map, chain, call, applySpec, prop, compose } = require('ramda');
const { generateAddress } = require('../../fixtures/index');
const { createNthVector } = require('../../utils/index');
const {
  applyCaptureDriver,
  getRandomValueInVector,
} = require('../helpers/index');

const vector = createNthVector(50);
const table = 'addresses';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  const apDriver = applyCaptureDriver(knex);

  const apCities = apDriver('cities', '*');
  const apStates = apDriver('states', '*');

  const [cities, states] = await Promise.all(chain(call, [apCities, apStates]));

  const overMap = (entries) => prop('id', getRandomValueInVector(entries));

  const apply = applySpec({
    city_id: () => overMap(cities),
    state_id: () => overMap(states),
    address_line_one: prop('address_line_one'),
    address_line_two: prop('address_line_two'),
    postal_code: prop('postal_code'),
  });

  const mapTable = map(compose(apply, generateAddress));

  await knex(table).del();
  await knex(table).insert(mapTable(vector));
};
