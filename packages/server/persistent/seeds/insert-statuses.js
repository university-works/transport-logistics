const { map, always } = require('ramda');
const {
  STATUSES_RECORD: { STATUSES },
} = require('../../consts/index');

const table = 'statuses';
const mapStatuses = (status) => ({ name: status });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = (knex) =>
  knex(table)
    .del()
    .then(always(knex(table).insert(map(mapStatuses)(STATUSES))));
