/**
 * @print each dependency’s name, its semver range,
 * @and the actual version installed in @node_modules.
 */

const fs = require('fs');
const { resolve, join } = require('path');

const { Future } = require('ramda-fantasy');

const {
  map,
  chain,
  traverse,
  curry,
  identity,
  compose,
  prop,
  reduce,
  lift,
} = require('ramda');

const {
  cacheFuture,
  futurifyWithEither,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-future');

const safeParse = require('../src/safe-parse');

const eitherToFuture = require('../src/internal/natural-transformations/convertation-between-algebraic-types/either-to-future');

const {
  toEither,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const constant = require('../src/constant');

/** @: toReadFileEither :: Path Encoding -> Future Error Either Right */
const toReadFileEither = futurifyWithEither(fs.readFile);

/** @: readEither :: Encoding -> Path -> Future Error Either Right */
const readEither = (encoding) => (path) => toReadFileEither(path, encoding);

/** @constants :: encoding, fileName  */
const encoding = constant('utf-8');
const fileName = constant('../package.json');

/** @: logger :: Message -> Value -> Log Message Value */
const logger = (message) => (value) => console.log({ message, value });

/** @: readPkgUpResultF :: Path, FileName -> Future Error JSON */
const readPkgUpResultF = compose(
  chain(eitherToFuture),
  map(safeParse),
  cacheFuture,
  chain(eitherToFuture),
  readEither(encoding),
);

/** @: eiPkgFieldValue :: Field -> Object -> Either Left ErrMessage Right Object[Field] */
const eiPkgFieldValue = curry(
  compose(toEither('dependencies are nullable'), prop),
);

/** @: depSemverRangeDictF :: Object -> Future Error Value */
const depSemverRangeDictF = compose(
  chain(eitherToFuture),
  map(eiPkgFieldValue('dependencies')),
);

/** @: package :: Future Error JSON */
const package = readPkgUpResultF(fileName);

/** @: dependencies :: Future Error Value */
const dependencies = depSemverRangeDictF(package);

/** @: fnDepNamesF :: Object -> List Object Keys */
const fnDepNamesF = map(Object.keys);

/** @: depNamesF :: List Object Keys */
const depNamesF = fnDepNamesF(dependencies);

/** @: curriedJoin :: String -> String -> String */
const curriedJoin = (dirname) => (name) => join(dirname, name);

/** @: joinPaths :: BasePath -> Functor Path -> Funtor ResolvedPath */
const joinPaths = (basePath) => map(curriedJoin(basePath));

/** @: mjoinPaths :: joinPaths up to functor context */
const mjoinPaths = lift(joinPaths);

/** @: pathF :: Future Path */
const pathF = Future.of(__dirname + fileName);

/** @: curriedResolve :: Ending -> Path -> Path Ending */
const curriedResolve = (end) => (path) => resolve(path, end);

/** @: resolvedPathF :: Path -> Functor Path Ending */
const resolvedPathF = map(curriedResolve('../src/node_modules'));

/** @: depPathsF :: Future Error Dependency’s Path */
const depPathsF = mjoinPaths(resolvedPathF(pathF), depNamesF);

/** @: readPkg :: List Dependency’s Path -> Future JSON */
const readPkg = compose(chain(eitherToFuture), readEither(encoding));

/** @: depsPkgJSONF :: List Dependency’s Path -> Future List JSON */
const depsPkgJSONF = compose(
  chain(traverse(Future.of, identity)),
  map(chain(eitherToFuture)),
  map(chain(safeParse)),
  chain(traverse(Future.of, readPkg)),
);

/** @: constructPcks :: Cache Value -> ...Cache Cache Value */
const constructPcks = (acc, val) => ({ ...acc, [val.name]: val.version });

/** @: getDepVersionDictF :: List Keys */
const getDepVersionDictF = map(reduce(constructPcks, {}));

/**
 * @use dep here because of err while reading node_modules/
 *
 * @const dep = Future.of(['ramda-package.json', 'ramda-fantasy.json']);
 * @const depVersionDictF = getDepVersionDictF(depsPkgJSONF(dep));
 */

/** @: depVersionDictF :: Future List Keys */
const depVersionDictF = getDepVersionDictF(depsPkgJSONF(depPathsF));

/** @: handleMap :: List Semver Deps, Actual Deps -> Package Name -> ...Semver ...Actual */
const handleMap = (depSemverRangeDict, depVersionDict) => (name) => ({
  dependency: name,
  'semver-range': prop(name)(depSemverRangeDict),
  'installed-version': prop(name)(depVersionDict),
});

/** @: handleDependencies :: List Semver Deps, Actual Deps, Package Name -> List ...Semver ...Actual */
const handleDependencies = (depSemverRangeDict, depVersionDict, names) =>
  map(handleMap(depSemverRangeDict, depVersionDict), names);

/** @: fnDepsColumnifyDataF :: handleDependencies up to functor context */
const fnDepsColumnifyDataF = lift(handleDependencies);

/** @: depsColumnifyDataF :: Future List Keys */
const depsColumnifyDataF = fnDepsColumnifyDataF(
  dependencies,
  depVersionDictF,
  depNamesF,
);

depsColumnifyDataF.fork(logger('err while logging columns'), console.table);
