const { curry, always } = require('ramda');

const CACHE_MAP = {
  REPOS: 'initiated_repos',
  INSTANCES: 'initiated_instances',
  TABLE_COLUMNS: 'tables_columns',
  USERS: 'users',
};

const defaultSettings = {};

const clones = {
  useClones: false,
};

/** @: getCache :: cache -> namespace -> repo namespace */
const getCache = curry((cache = {}, namespace) => {
  const assign = (...params) => (cache[namespace] = { ...params });

  const repos = {
    [CACHE_MAP.REPOS]: always(assign(defaultSettings)),
    [CACHE_MAP.INSTANCES]: always(assign(...defaultSettings, ...clones)),
  };

  if (!cache[namespace]) {
    repos[namespace]();
  }
  return cache[namespace];
});

module.exports = { getCache, CACHE_MAP };
