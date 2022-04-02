const { wrapChanceMethods, wrapChance } = require('../utils/index');

const {
  first,
  last,
  prefix,
  suffix: sf,
  ssn,
  email,
  phone,
} = wrapChanceMethods;

const options = {
  firstname: {},
  lastname: {},
  middlename: { full: true },
  title: { full: true },
  suffix: { full: true },
  email: { domain: 'example.com' },
  phone: {},
};

const generateContact =
  (params) =>
  ({
    first_name = first({}, wrapChance),
    last_name = last({}, wrapChance),
    middle_name = prefix(params.middlename, wrapChance),
    title = ssn(params.title, wrapChance),
    suffix = sf(params.suffix, wrapChance),
    email_address = email(params.email, wrapChance),
    phone_number = phone(params.phone, wrapChance),
  } = {}) => ({
    first_name,
    last_name,
    middle_name,
    title,
    suffix,
    email_address,
    phone_number,
  });

module.exports = generateContact(options);
