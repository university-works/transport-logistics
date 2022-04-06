const getAll = (req, res) => {
  return res.send({
    message: 'from users',
  });
};

module.exports = { getAll };
