const table = 'users';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable(table, (t) => {
    t.increments('id').primary();
    t.string('name', 255).notNullable();
    t.timestamps({ defaultToNow: true });
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists(table);
