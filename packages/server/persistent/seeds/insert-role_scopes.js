const {
  call,
  map,
  compose,
  prop,
  chain,
  equals,
  where,
  find,
  converge,
  complement,
  filter,
  includes,
  splitEvery,
  last,
  curry,
  reduce,
} = require('ramda');

const { applyCaptureDriver } = require('../helpers/index');

const {
  TENANT_ROLES_RECORD: { TENANT_ROLE },
} = require('../../consts/index');

const table = 'role_scopes';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  const usualRoles = [TENANT_ROLE.standart, TENANT_ROLE.registered];

  const apDriver = applyCaptureDriver(knex);
  const apScopes = apDriver('scopes', '*');
  const apRoles = apDriver('roles', '*');

  const [scopes, roles] = await Promise.all(chain(call, [apScopes, apRoles]));

  const whereRole = (role) => find(where({ code: equals(role) }));
  const notGlobals = filter((role) => includes(role.code, usualRoles));

  const grants = [
    whereRole(TENANT_ROLE.admin),
    whereRole(TENANT_ROLE.global),
    whereRole(TENANT_ROLE.constributor),
    whereRole(complement(TENANT_ROLE.admin)),
  ];

  const selectRoles = converge((...args) => args, grants);
  const [admin, global, constributor] = selectRoles(roles);

  const grantAllScopes = (role) =>
    map(({ id }) => ({
      role_id: prop('id', role),
      scope_id: id,
    }));

  const head = curry((xs, n = 0) => xs[n]);

  const grantConstibutor = curry((role, n) => {
    const selectGrants = converge((...args) => args, [head, last]);
    const unwrap = (acc, value) => [...acc, ...value];
    const toSelect = compose(selectGrants, splitEvery(n));
    return compose(reduce(unwrap, []), toSelect, grantAllScopes(role));
  });

  const findRole = (name) => compose(whereRole(name), notGlobals);

  const standart = findRole(TENANT_ROLE.standart)(roles);
  const registered = findRole(TENANT_ROLE.registered)(roles);

  await knex(table).del();
  await knex(table).insert([
    ...grantAllScopes(admin)(scopes),
    ...grantAllScopes(global)(scopes),
    ...grantConstibutor(constributor, 4)(scopes),
    ...grantConstibutor(standart, 3)(scopes),
    ...grantConstibutor(registered, 1)(scopes),
  ]);
};
