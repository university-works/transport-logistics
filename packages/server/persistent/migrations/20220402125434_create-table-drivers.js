const table = 'drivers';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable(table, (t) => {
    t.increments('id').primary();

    t.integer('employee_id').unsigned().notNullable();
    t.integer('driver_type_id').unsigned().notNullable();
    t.integer('rating_id').unsigned().notNullable();

    t.foreign('employee_id')
      .references('id')
      .inTable('employees')
      .onDelete('CASCADE');
    t.foreign('driver_type_id')
      .references('id')
      .inTable('driver_types')
      .onDelete('CASCADE');
    t.foreign('rating_id')
      .references('id')
      .inTable('ratings')
      .onDelete('CASCADE');

    t.timestamps({ defaultToNow: true });
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists(table);
