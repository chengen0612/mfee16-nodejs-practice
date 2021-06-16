// make connection
const express = require('express');
const app = express();

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