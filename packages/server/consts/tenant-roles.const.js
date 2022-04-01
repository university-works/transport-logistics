const TENANT_ROLE = {
  admin: 'admin',
  global: 'global',
  constributor: 'constributor',
  standart: 'standart',
  registered: 'registered',
};

const TENANT_ROLES = Object.values(TENANT_ROLE);

module.exports = { TENANT_ROLE, TENANT_ROLES };
