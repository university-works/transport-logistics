/**
 * @Common programming principles:
 * - DRY (don't repeat yourself)
 * - YAGNI (ya ain't gonna need it)
 * - Loose coupling high cohesion
 * - Principle of least surprise
 * - Single responsibility
 *
 * @. All of them are related to functional programming
 */

/**
 * @Handling if-else condition. Either
 * @Handling exception Null. Maybe
 * @Funtions are reusable and can be used anywhere. Pure functions & Referential Transparency
 * @Make sure that input data are not mutated and can be used in other parts.
 * @Pure functions, immutability
 * @Can be used in composition when expected only one argument. Curring
 * @And so on.
 */

const appendUniq = require('./append-unique');
const avg = require('./avg');
const clone = require('./clone');
const concatUniq = require('./concat-uniq');
const constant = require('./constant');
const constructMessageWithObjectProperty = require('./constr-msg-with-o-prop');
const first = require('./first');
const argv = require('./get-argv-names');
const getJson = require('./get-json');
const headEqualsGreatest = require('./head-equals-greatest');
const httpGet = require('./http-get');
const invertByField = require('./invert-by-field');
const last = require('./last');
const pureLog = require('./pure-log');
const requireRangeExample = require('./require-range-example');
const nth = require('./safe-nth');
const safeParse = require('./safe-parse');
const safeStringify = require('./safe-stringify');
const tap = require('./tap');
const toEncoding = require('./to-encoding');
const trace = require('./trace');
const trueByField = require('./true-by-field');
const withDefault = require('./with-default');
const safePropWithMaybe = require('./safe-prop-maybe');
const safePropWithEither = require('./safe-prop-either');
const safeRead = require('./safe-read');

const id = require('./internal/algebraic-types/identity/index');
const ap = require('./internal/algebraic-types/applicative/index');
const either = require('./internal/algebraic-types/either/index');
const lazy = require('./internal/algebraic-types/lazy-functor/index');

const monoid = require('./internal/algebraic-types/monoid/index');
const semigroup = require('./internal/algebraic-types/semigroup/index');
const iso = require('./internal/isomorphism/index');
const cast = require('./internal/natural-transformations/cast-scalar-to-type/index');
const convert = require('./internal/natural-transformations/convertation-between-algebraic-types/index');

const fns = {
  appendUniq,
  avg,
  clone,
  concatUniq,
  constant,
  constructMessageWithObjectProperty,
  first,
  last,
  argv,
  getJson,
  headEqualsGreatest,
  httpGet,
  invertByField,
  pureLog,
  requireRangeExample,
  nth,
  safeParse,
  safeStringify,
  tap,
  trace,
  toEncoding,
  trueByField,
  withDefault,
  safePropWithEither,
  safePropWithMaybe,
  safeRead,
};

module.exports = {
  semigroup,
  monoid,
  iso,
  lazy,
  either,
  ap,
  id,
  cast,
  convert,
  fns,
};
