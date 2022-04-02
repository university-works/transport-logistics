const table = 'users';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.alterTable(table, (t) => {
    t.string('password', 255).nullable().defaultTo(null);
    t.dateTime('last_login').nullable().defaultTo(null);
    t.integer('contact_id').unsigned().nullable();

    t.foreign('contact_id')
      .references('id')
      .inTable('contacts')
      .onDelete('CASCADE');
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) =>
  knex.schema.alterTable(table, (t) => {
    t.dropColumn('password');
    t.dropColumn('last_login');
    t.dropColumn('contact_id');
  });
