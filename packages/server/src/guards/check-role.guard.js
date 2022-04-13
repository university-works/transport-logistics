const { cast } = require('@fp/common');
const { curry, identity } = require('ramda');
const { wrapBase } = require('./wrappers/index');

const { toEither, either } = cast;

const repos = {
  roleRepository: wrapBase('roles'),
  userRoleRepository: wrapBase('user_roles'),
};

/** @: checkRole :: ...args -> boolean */
const checkRole = curry(async (repos, roles, user) => {
  const { roleRepository, userRoleRepository } = repos;

  const userRoleRecord = await userRoleRepository.getBy({
    condition: {
      user_id: user.id,
    },
  });
  const roleRecord = await roleRepository.getBy({
    condition: {
      id: userRoleRecord.role_id,
    },
  });

  const left = curry((roles, err) => {
    throw new Error(`${err} ${JSON.stringify(roles)}`);
  });

  return either(
    left(roles),
    identity,
    toEither('Forbidden by user role, only:', roles.includes(roleRecord.code)),
  );
});

module.exports = checkRole(repos);
