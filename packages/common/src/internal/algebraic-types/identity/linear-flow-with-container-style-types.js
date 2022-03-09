/**
 * @const id = x => x
 */

/**
 * @Functor
 *
 * > fmap (+3) (Just 2)
 * Just 5
 *
 * instance Functor Maybe where
 *   fmap func (Just val) = Just (func val)
 *   fmap func Nothing = Nothing
 *
 * > fmap (+3) Nothing
 * Nothing
 * > (+) <$> (Just 5)
 * Just (+5)
 * > Just (+5) <$> (Just 4)
 * @Error Occured Use Applicative Functors
 */

const identity = (x) => ({
  map: (f) => identity(f(x)),
  inspect: () => `identity(${x})`,
  chain: (f) => f(x),
  ap: (f) => f.map((v) => x(v)),
  join: () => x,
});

module.exports = identity;
