const getAll = (req, res) => {
  return res.send({
    message: 'from states',
  });
};

const create = (req, res) => {
  console.log({ body: req.body });
  res.send('ok');
};

module.exports = { getAll, create };
