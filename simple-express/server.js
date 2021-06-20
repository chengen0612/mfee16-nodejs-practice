// make connection
const express = require('express');
const app = express();
const connection = require('./utils/db');

// express.static('path');
// 可以指定一個或多個靜態資源目錄，並自動為目錄底下的資源建立路由
// 網址列設定正確路徑就可以直接找到靜態目錄裡面的檔案
app.use(express.static('public'));

// 解讀 post 資料的中間件
app.use(express.urlencoded({ extended : false}));

// app.set('views', 'views');
// 第一個是固定的變數 views，第二個是檔案夾名稱
app.set('views', 'views');
// 告訴 express 我們要用 pug 套件做渲染
app.set('view engine', 'pug');

// self-built middleware
app.use((req, res, next) => {
  let now = new Date().toLocaleString();
  console.log(`有訪客在 ${now} 時來訪`);
  next();
});

// router
app.get('', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/product', (req, res) => {
  res.send('這是商品目錄');
});

// self-built routers
const stockRouter = require('./routes/stock');
app.use('/stock', stockRouter);

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

const registerRouter = require('./routes/auth');
app.use('/auth', registerRouter);

// didn't catch by any router above
app.use((req, res, next) => {
  res.status(404);
  res.render('404');
});

// lastly
app.use((err, req, res, next) => {
  console.log(`500 error: ${err.message}`);
  res.status(500);
  res.send('伺服器異常，請洽系統管理員');
});

// event listener
// already set server secretly, no need to create server before routing
app.listen(3000, async () => {
  // create connection
  await connection.connectAsync();
  console.log('我要接收 3000 port 的請求');
});