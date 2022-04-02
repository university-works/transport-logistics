const requireModules = require('../utils/require-modules.utils');

const fns = {
  'users.fixtures': 'generateUser',
  'projects.fixtures': 'generateProject',
  'states.fixtures': 'generateState',
  'cities.fixtures': 'generateCity',
  'countries.fixtures': 'generateCountry',
  'addresses.fixtures': 'generateAddress',
  'contacts.fixtures': 'generateContact',
  'employees.fixtures': 'generateEmployee',
  'drivers.fixtures': 'generateDriver',
  'notes.fixtures': 'generateNote',
  'uploads.fixtures': 'generateUpload',
};

module.exports = requireModules(__dirname)(fns);
