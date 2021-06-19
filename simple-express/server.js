// make connection
const express = require('express');
const app = express();
const connection = require('./utils/db');

// express.static('path');
// 可以指定一個或多個靜態資源目錄，並自動為目錄底下的資源建立路由
// 網址列設定正確路徑就可以直接找到靜態目錄裡面的檔案
app.use(express.static('public'));

// app.set('views', 'views');
// 設定中間件 views
// 第一個是固定的變數 views，第二個是檔案夾名稱
app.set('views', 'views');
// 告訴 express 我們要用 pug 套件做渲染
app.set('view engine', 'pug');

// middleware
// do something before routing
app.use((req, res, next) => {
  let now = new Date().toLocaleString();
  console.log(`有訪客在 ${now} 時來訪`);
  next();
});

// router
app.get('', (req, res) => {
  // res.send('這是主頁');
  // 到 views dir 底下找到 index.pug
  res.render('index');
});

app.get('/about', (req, res) => {
  // res.send('這是關於我們');
  // 到 views dir 底下找到 about.pug
  res.render('about');
});

app.get('/product', (req, res) => {
  res.send('這是商品目錄');
});

app.get('/stock', async (req, res) => {
  let result = await connection.queryAsync('SELECT * FROM stock');
  res.render('stock/list', {
    stocks : result
  });
});

app.get('/stock/:stockCode', async (req, res) => {
  let stockCode = req.params.stockCode;
  let data = await connection.queryAsync('SELECT * FROM stock_price WHERE stock_id = ?;',
    req.params.stockCode
  );
  // console.log(data);
  res.render('stock/detail', {
    code : stockCode,
    stocks : data
  });
});

// event listener
// already set server secretly, no need to create server before routing
app.listen(3000, async () => {
  // create connection
  await connection.connectAsync();
  console.log('我要接收 3000 port 的請求');
});