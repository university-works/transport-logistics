const table = 'notes';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable(table, (t) => {
    t.increments('id').primary();
    t.string('note', 500).notNullable();
    t.integer('contact_id').unsigned().notNullable();

    t.foreign('contact_id')
      .references('id')
      .inTable('contacts')
      .onDelete('CASCADE');

    t.timestamps({ defaultToNow: true });
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists(table);
