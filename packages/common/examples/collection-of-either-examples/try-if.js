/**
 * @handle if inside try catch
 */

const {
  prop,
  compose,
  curry,
  chain,
  call,
  always,
  match,
  map,
} = require('ramda');

const {
  either,
  toEither,
  toEitherSafe,
} = require('../../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const { parse, stringify } = JSON;

/** @: postgresRegExp :: Value ->  -> Value */
const postgresRegExp = compose(call, always);

/** @: safeParse :: JSON String -> Either Error JSON */
const safeParse = toEitherSafe(parse);

/** @: eiUrl :: Property -> Either Error Value */
const eiUrl = curry(compose(toEither('url is null'), prop));

/** @: parseDatabaseUrl :: JSON String -> Match Postgres Config */
const parseDatabaseUrl = compose(
  map(match(postgresRegExp(/postgres/))),
  chain(eiUrl('url')),
  safeParse,
);

/** @: getConstant :: Value -> -> Value */
const getConstant = compose(call, always);

/**
 * @usage
 */

const flow = either(always(null), getConstant);
const run = compose(flow, parseDatabaseUrl);
const config = { url: 'postgres' };

const conf = stringify(config);
const noConf = stringify(null);

/**
 * @console.table({ fail: run(noConf), ok: run(conf) }); // eslint-disable-line
 */
