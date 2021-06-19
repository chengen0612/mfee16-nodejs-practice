const express = require('express');
const router = express.Router();
const connection = require('../utils/db');

router.get('/', async (req, res) => {
  const result = await connection.queryAsync('SELECT * FROM stock');
  res.render('stock/list', {
    stocks : result
  });
});

router.get('/:stockCode', async (req, res, next) => {
  const stockCode = req.params.stockCode;
  const currentPage = req.query.page || 1;
  const limit = 10;
  const start = (currentPage - 1) * limit;

  const data = await connection.queryAsync(
    'SELECT * FROM stock_price WHERE stock_id = ? LIMIT ?, ?',
    [stockCode, start, limit]
  );

  // error handling
  if (data.length === 0) {
    // back to server.js to handdle error
    return next();
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
      number,
    }
  });
});

module.exports = router;