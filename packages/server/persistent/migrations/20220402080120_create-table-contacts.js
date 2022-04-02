const table = 'contacts';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable(table, (t) => {
    t.increments('id').primary();
    t.string('title', 100).notNullable();
    t.string('first_name', 100).notNullable();
    t.string('middle_name', 100).nullable().defaultTo(null);
    t.string('last_name', 100).notNullable();
    t.string('suffix', 100).nullable().defaultTo(null);
    t.string('email_address', 100).nullable().defaultTo(null);
    t.string('phone_number', 100).nullable().defaultTo(null);

    t.integer('address_id').unsigned().notNullable();

    t.foreign('address_id')
      .references('id')
      .inTable('addresses')
      .onDelete('CASCADE');
    t.timestamps({ defaultToNow: true });
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists(table);
