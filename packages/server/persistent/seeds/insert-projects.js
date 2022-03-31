const { map, always } = require('ramda');
const { generateProject } = require('../../fixtures/index');
const { createNthVector } = require('../../utils/index');

const vector = createNthVector(4);
const table = 'projects';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = (knex) =>
  knex(table)
    .del()
    .then(always(knex(table).insert(map(generateProject)(vector))));
