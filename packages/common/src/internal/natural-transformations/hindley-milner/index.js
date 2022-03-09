const { tail, curry } = require('ramda');

/** @: head :: [a] -> a */
const head = (xs) => xs[0];

/** @: toUpperCase :: String -> String */
const toUpperCase = (s) => s.toUpperCase();

/** @: toLowerCase :: String -> String */
const toLowerCase = (s) => s.toLowerCase();

/** @: capitalize :: String -> String */
const capitalize = (s) => toUpperCase(head(s)) + toLowerCase(tail(s)); //eslint-disable-line

/** @: strLength :: String -> Number */
const strLength = (s) => s.length; //eslint-disable-line

/** @: join :: String -> [String] -> String */
/** @: join :: String -> ([String] -> String) */
const join = curry((what, xs) => xs.join(what)); //eslint-disable-line

/** @: match :: RegExp -> String -> [String] */
/** @: match :: RegExp -> (String -> [String]) */
const match = curry((regExg, s) => s.match(regExg)); //eslint-disable-line

/** @: replace :: RegExp -> String -> String -> String */
/** @: replace :: RegExp -> (String -> (String -> String)) */
// eslint-disable-next-line
const replace = curry(
  (
    regExp,
    substitution,
    s, //eslint-disable-line
  ) => s.replace(regExp, substitution),
);

/** @: id :: a -> a */
const id = (x) => x; //eslint-disable-line

/** @: map :: (a -> b) -> [a] -> [b] */
const map = curry((f, xs) => xs.map(f)); //eslint-disable-line

/** @: filter ::  (a -> Bool) -> [a] -> [a] */
const filter = curry((f, xs) => xs.filter(f)); //eslint-disable-line

/** @: reduce :: ((b, a) -> b) -> b -> [a] -> b  */
const reduce = curry((f, x, xs) => xs.reduce(f, x)); //eslint-disable-line

/**
 * @Parametric Polimorphism - ability of parameters of function
 * @to make function handle parameters of different types
 * @the same way -> execute the same code for different types
 *
 * @: In any case, the point is that the possible behavior of
 * @a function is largely narrowed down by the polymorphism of its type.
 *
 * @Examples:
 *
 * @: head :: [a] -> a
 * @: reverse :: [a] -> [a]
 */

/** @Free Theorems */

/**
 * @: head :: [a] -> a
 * @compose(f, head) === compose(head, map(f));
 *
 * @: filter :: (a -> Bool) -> [a] -> [a]
 * @compose(map(f), filter(compose(p, f))) === compose(filter(p), map(f));
 */
