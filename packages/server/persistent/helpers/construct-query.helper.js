/** @: constructQuery :: driver -> table, ...field -> table query */
const constructQuery =
  (knex) =>
  (name, ...fields) =>
    knex.select(...fields).from(name);

module.exports = constructQuery;
