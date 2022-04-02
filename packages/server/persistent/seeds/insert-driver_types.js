const { map, always } = require('ramda');
const {
  DRIVER_TYPES_RECORD: { DRIVER_TYPES },
} = require('../../consts/index');

const table = 'driver_types';

const mapDriverTypes = (type) => {
  const [name, abbreviation] = type.split(':');
  return { name, abbreviation };
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = (knex) =>
  knex(table)
    .del()
    .then(always(knex(table).insert(map(mapDriverTypes)(DRIVER_TYPES))));
