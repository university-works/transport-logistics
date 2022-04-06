const express = require('express');
const router = express.Router();
const { getAll } = require('./user.controller');

router.get('/', getAll);

module.exports = router;
