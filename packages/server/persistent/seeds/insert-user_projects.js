const {
  converge,
  call,
  always,
  compose,
  modulo,
  omit,
  map,
  gte,
  prop,
  complement,
  applySpec,
  identity,
  flip,
  filter,
} = require('ramda');

const table = 'user_projects';

const constructQuery =
  (knex) =>
  (name, ...fields) =>
    knex.select(...fields).from(name);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  const query = constructQuery(knex);
  const alwQ = compose(always, query);
  const values = call(
    converge((...args) => args, [alwQ('users', '*'), alwQ('projects', '*')]),
  );

  const [users, projects] = await Promise.all(values);
  const [grant, other, ...rest] = users;

  const getAll = map(({ id }) => ({
    user_id: prop('id', grant),
    project_id: id,
  }));

  const chooseMode = compose(gte(0), prop('mode'));

  const params = (scalar, inst) =>
    applySpec({
      user_id: always(prop('id', inst)),
      project_id: identity,
      mode: flip(modulo)(scalar),
    });

  const pickIdWithParams = (tenant) =>
    compose(map(params(2, tenant)), map(prop('id')));

  const filterAndOmit = (predicate) =>
    compose(map(omit(['mode'])), filter(predicate));

  const applyMap = (predicate, tenant) =>
    compose(filterAndOmit(predicate), pickIdWithParams(tenant));

  const previous = users[users.length - 2];
  const last = projects[projects.length - 1].id;

  const getLastOnes = map(({ id }) => ({
    user_id: id,
    project_id: last,
  }));

  await knex(table).del();

  await knex(table).insert([
    ...getAll(projects),
    ...applyMap(chooseMode, other)(projects),
    ...applyMap(complement(chooseMode), previous)(projects),
    ...getLastOnes(rest),
  ]);
};
