/**
 * @round trip transfer with saving data to and from
 *
 * @from(to(x)) === x
 * @to(from(y)) === y
 */

const iso = (to, from) => ({
  to,
  from,
});

module.exports = iso;
