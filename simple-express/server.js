// make connection
const express = require('express');
const app = express();

// express.static('path');
// 可以指定一個或多個靜態資源目錄，並自動為目錄底下的資源建立路由
app.use(express.static('public'));

// middleware
// do something before routing
app.use((req, res, next) => {
  let now = new Date().toLocaleString();
  console.log(`有訪客在 ${now} 時來訪`);
  next();
});

// router
app.get('', (req, res) => {
  res.send('這是主頁');
});

app.get('/about', (req, res) => {
  res.send('這是關於我們');
});

app.get('/product', (req, res) => {
  res.send('這是商品目錄');
});

// event listener
// already set server secretly, no need to create server before routing
app.listen(3000, () => {
  console.log('我要接收 3000 port 的請求');
});