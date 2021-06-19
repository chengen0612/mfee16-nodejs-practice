const express = require('express');
const router = express.Router();
const connection = require('../utils/db');

router.get('/stock', async (req, res) => {
  let result = await connection.queryAsync('SELECT * FROM stock');
  res.json(result);
});

module.exports = router;