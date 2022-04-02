const table = 'employees';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable(table, (t) => {
    t.increments('id').primary();
    t.string('job_title', 100).notNullable();
    t.date('birth_date').notNullable();
    t.date('interview_date').notNullable();
    t.date('hire_date').notNullable();

    t.integer('contact_id').unsigned().notNullable();
    t.integer('status_id').unsigned().notNullable();

    t.foreign('contact_id')
      .references('id')
      .inTable('contacts')
      .onDelete('CASCADE');
    t.foreign('status_id')
      .references('id')
      .inTable('statuses')
      .onDelete('CASCADE');

    t.timestamps({ defaultToNow: true });
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists(table);
