const express = require('express');
const router = express.Router();
const connection = require('../utils/db');

router.get('/', async (req, res) => {
  const result = await connection.queryAsync('SELECT * FROM stock');
  res.render('stock/list', {
    stocks : result
  });
});

router.get('/:stockCode', async (req, res) => {
  const stockCode = req.params.stockCode;
  const currentPage = req.query.page || 1;
  const limit = 10;

  const data = await connection.queryAsync(
    `SELECT * FROM stock_price WHERE stock_id = ? LIMIT ${currentPage}, ${limit}`,
    stockCode
  );

  // error handling
  if (data.length === 0) {
    // back to error handling in server.js
    next();
  };

  const rowCount = await connection.queryAsync(
    'SELECT COUNT(*) AS total FROM stock_price WHERE stock_id = ?',
    stockCode
  );
  const total = rowCount[0].total;
  const number = Math.ceil(total / limit);

  res.render('stock/detail', {
    code : stockCode,
    stocks : data,
    pagination : {
      total,
      number,
    }
  });
});

module.exports = router;