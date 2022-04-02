const { map, always } = require('ramda');
const {
  RATINGS_RECORD: { RATINGS },
} = require('../../consts/index');

const table = 'ratings';

const mapRatings = (rating) => ({ name: rating });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = (knex) =>
  knex(table)
    .del()
    .then(always(knex(table).insert(map(mapRatings)(RATINGS))));
