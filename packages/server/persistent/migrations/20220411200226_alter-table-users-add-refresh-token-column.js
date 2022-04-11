const table = 'users';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.alterTable(table, (t) => {
    t.text('refresh_token').nullable().defaultTo(null);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) =>
  knex.schema.alterTable(table, (t) => {
    t.dropColumn('refresh_token');
  });
