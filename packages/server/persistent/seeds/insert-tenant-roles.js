const { map, always, inc, mapObjIndexed } = require('ramda');
const { TENANT_ROLES } = require('../../consts/index');

const table = 'roles';
const mapTenantRoles = (role) => ({ code: role });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = (knex) =>
  knex(table)
    .del()
    .then(always(knex(table).insert(map(mapTenantRoles)(TENANT_ROLES))));
