const { map, compose, reduce } = require('ramda');

const { TENANT_ENTRIES } = require('./tenant-entries.const');
const { TENANT_RIGHTS } = require('./tenant-rights.const');

/** @: flatReducer :: acc, T -> combine T */
const flatReducer = (acc, value) => ({ ...acc, ...value });

/** @: entryMap :: acc -> combine */
const entryMap = (entry) =>
  reduce(
    (rightAcc, right) => ({
      ...rightAcc,
      [`${entry}:${right}`]: `${entry}:${right}`,
    }),
    {},
    TENANT_RIGHTS,
  );

/** @: scopeHashReducer :: entry -> vector hash entry rights */
const scopeHashReducer = compose(reduce(flatReducer, {}), map(entryMap));

/** @: scopeVectorReducer :: entry -> vector entry rights */
const scopeVectorReducer = compose(Object.values, scopeHashReducer);

module.exports = scopeVectorReducer(TENANT_ENTRIES);
