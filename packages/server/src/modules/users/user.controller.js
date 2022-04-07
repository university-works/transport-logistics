const asyncWrap = require('../../../utils/express/async-wrap.utils');

const getAll = asyncWrap(async (req, res) => {
  // throw 1;
  return {
    message: 'from users',
  };
});

module.exports = { getAll };
