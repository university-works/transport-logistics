const { map, always } = require('ramda');
const {
  INCIDENT_TYPES_RECORD: { INCIDENT_TYPES },
} = require('../../consts/index');

const table = 'incident_types';

const mapIncidentTypes = (incident) => ({ name: incident });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = (knex) =>
  knex(table)
    .del()
    .then(always(knex(table).insert(map(mapIncidentTypes)(INCIDENT_TYPES))));
