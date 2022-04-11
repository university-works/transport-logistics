const table = 'users';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.alterTable(table, (t) => {
    t.string('email', 255).nullable().defaultTo(null);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) =>
  knex.schema.alterTable(table, (t) => {
    t.dropColumn('email');
  });
