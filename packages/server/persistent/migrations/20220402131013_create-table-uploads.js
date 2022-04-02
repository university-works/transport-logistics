const table = 'uploads';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable(table, (t) => {
    t.increments('id').primary();
    t.string('name', 255).notNullable();
    t.string('size', 255).notNullable();
    t.string('type', 255).notNullable();
    t.string('url', 255).notNullable();

    t.string('description', 255).nullable().defaultTo(null);
    t.date('upload_date').notNullable().defaultTo(knex.fn.now());

    t.integer('contact_id').unsigned().notNullable();
    t.integer('user_id').unsigned().notNullable();

    t.foreign('contact_id')
      .references('id')
      .inTable('contacts')
      .onDelete('CASCADE');
    t.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');

    t.timestamps({ defaultToNow: true });
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists(table);
