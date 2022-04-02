const { map, always } = require('ramda');
const { generateState } = require('../../fixtures/index');
const { createNthVector } = require('../../utils/index');

const vector = createNthVector(20);
const table = 'states';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = (knex) =>
  knex(table)
    .del()
    .then(always(knex(table).insert(map(generateState)(vector))));
