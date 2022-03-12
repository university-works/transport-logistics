/**
 * @handle nested ifs wiht either and maybe
 */

const {
  prop,
  map,
  compose,
  chain,
  pathOr,
  identity,
  always,
} = require('ramda');

const {
  either,
  toEither,
} = require('../../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const {
  maybe,
} = require('../../src/internal/natural-transformations/cast-scalar-to-type/to-maybe');

/** @: defaultStreet :: Message -> -> Message */
const defaultStreet = always('no street');

/**
 * @example-a with either
 */

/** @: eitherStreetName :: User -> Either Error User */
const eitherStreetName = compose(
  map(prop('name')),
  chain(toEither('user street in nullable')),
  map(prop('street')),
  toEither('user is nullable'),
  prop('address'),
);

const user = {
  address: {
    street: {
      name: 'street name',
    },
  },
};

/**
 * @usage of example-a
 */

const flow = either(defaultStreet, identity);
const userEither = eitherStreetName(user);
const noUserEither = eitherStreetName({});

/**
 * @console.table({ user: flow(userEither), noUser: flow(noUserEither) }); // eslint-disable-line
 */

/**
 * @example-b with maybe
 */

/** @: maybeStreetName :: User -> Maybe Nothing Just */
const maybeStreetName = compose(
  map(pathOr('no street', ['address', 'street', 'name'])),
  maybe,
);

/**
 * @usage of example-b
 */

const userMaybe = maybeStreetName(user).chain(identity);
const noUserMaybe = maybeStreetName({}).chain(identity);

/**
 * @console.table({ userMaybe, noUserMaybe }); // eslint-disable-line
 */
