const table = 'user_projects';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable(table, (t) => {
    t.increments('id');
    t.integer('user_id').unsigned().notNullable();
    t.integer('project_id').unsigned().notNullable();

    t.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.foreign('project_id')
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE');

    t.primary(['user_id', 'project_id']);
    t.timestamps({ defaultToNow: true });
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists(table);
