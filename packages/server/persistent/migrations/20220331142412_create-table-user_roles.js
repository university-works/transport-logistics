const table = 'user_roles';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable(table, (t) => {
    t.increments('id');
    t.integer('user_id').unsigned().notNullable();
    t.integer('role_id').unsigned().notNullable();

    t.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.foreign('role_id').references('id').inTable('roles').onDelete('CASCADE');

    t.primary(['user_id', 'role_id']);
    t.timestamps({ defaultToNow: true });
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists(table);
