const table = 'addresses';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable(table, (t) => {
    t.increments('id').primary();
    t.string('address_line_one', 255).notNullable();
    t.string('address_line_two', 255).nullable().defaultTo(null);
    t.string('postal_code', 255).notNullable();

    t.integer('city_id').unsigned().notNullable();
    t.integer('state_id').unsigned().notNullable();

    t.foreign('city_id').references('id').inTable('cities').onDelete('CASCADE');
    t.foreign('state_id')
      .references('id')
      .inTable('states')
      .onDelete('CASCADE');

    t.timestamps({ defaultToNow: true });
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists(table);
