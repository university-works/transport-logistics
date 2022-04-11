const { compare, hash } = require('bcrypt');
const { config } = require('../../config/index');

const HASH_SALT = config.get('HASH_SALT');

/** @: bcryptHash :: salt -> table fns */
const bcryptHash = (salt = HASH_SALT) => ({
  /** @: compareUserPassword :: string -> string -> boolean */
  compareUserPassword: (passwordToCompare, userPassword) =>
    compare(passwordToCompare, userPassword),

  /** @: hashPassword: string -> string */
  hashPassword: (password) => hash(password, salt),
});

module.exports = bcryptHash(HASH_SALT);
