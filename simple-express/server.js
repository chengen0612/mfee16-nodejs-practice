// foundation
const express = require('express');
const app = express();
const connection = require('./utils/db');
require('dotenv').config({ path: '/utils/.env' }); // invisible value

// application settings
app.set('views', 'views');
app.set('view engine', 'pug');

// built-in middleware
app.use(express.static('public')); // 靜態目錄
app.use(express.urlencoded({ extended : false})); // post reader

// self-built middleware
app.use((req, res, next) => {
  let now = new Date().toLocaleString();
  console.log(`有訪客在 ${now} 時來訪`);
  next();
});

// modules middleware
// const cookieParser = require("cookie-parser"); // cookie
// app.use(cookieParser()); 
const session = require('express-session'); // session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// locals session setup
app.use((req, res, next) => {
  app.locals.member = req.session.member;
  console.log('session in server.js: ', req.session);
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

const stockRouter = require('./routes/stock');
app.use('/stock', stockRouter);

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

const registerRouter = require('./routes/auth');
app.use('/auth', registerRouter);

// catch 404
app.use((req, res, next) => {
  res.status(404);
  res.render('404');
});

// error handler
// the very end of the process
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

// app.use(express.static('path'))
// 可以指定一個或多個靜態資源目錄，並自動為目錄底下的資源建立路由
// 被指定為靜態目錄的資料夾會被忽略，指定路徑時不須將其列入
// 無論是網址列或是檔案之間的引用，只要路徑正確就能直接找到靜態目錄裡面的檔案

// app.use(express.urlencoded({ extended : false}))
// 解讀 post 傳送的表單資料封包

// app.set('views', 'views')
// 第一個參數是固定的屬性值，第二個參數是靜態目錄名稱

// app.set('view engine', 'pug')
// 告訴 express 我們要用 pug 方式做渲染

// app.use((err, req, res, next) => {})
// 內建錯誤處理中間件
// 負責接住連線過程中沒有被處理的請求或錯誤，放在主程式的最下面