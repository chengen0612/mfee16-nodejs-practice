const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('我要接收 3000 port 的請求');
});