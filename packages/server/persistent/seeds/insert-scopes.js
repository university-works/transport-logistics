const { map, always } = require('ramda');
const { TENANT_SCOPES_RECORD } = require('../../consts/index');

const table = 'scopes';

const mapTenantScopes = (scope) => ({ code: scope });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = (knex) =>
  knex(table)
    .del()
    .then(
      always(knex(table).insert(map(mapTenantScopes)(TENANT_SCOPES_RECORD))),
    );
