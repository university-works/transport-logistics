const table = 'role_scopes';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable(table, (t) => {
    t.increments('id');
    t.integer('scope_id').unsigned().notNullable();
    t.integer('role_id').unsigned().notNullable();

    t.foreign('scope_id')
      .references('id')
      .inTable('scopes')
      .onDelete('CASCADE');
    t.foreign('role_id').references('id').inTable('roles').onDelete('CASCADE');

    t.primary(['scope_id', 'role_id']);
    t.timestamps({ defaultToNow: true });
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists(table);
