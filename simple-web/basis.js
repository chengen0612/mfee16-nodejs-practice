// built-in modules below, no need to install
const http = require('http');
const { URL } = require('url');
const fs = require('fs/promises');

// set up server maker
// check out what's inside the request obj with console
const server = http.createServer((req, res) => {
  // handle incoming request here
  console.log('收到連線請求...');
  console.log('請求連線到網址:', req.url); // url client trying to access

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8');

  switch (req.url) {
    case '/' :
      res.end('這是首頁');
      break;
    case '/test' :
      res.end('這是測試頁');
      break;
    case '/about' :
      res.end(`這是關於我們`);
      break;
    // if not exist
    default:
      res.writeHead(404);
      res.end('查無此網頁');
  };
});

// listen event
// only recieve request to 3000 port.
// if request had made, run executor(callback) set by http.createServer
server.listen(3000, () => {
  console.log("設置監聽事件: 接收向 3000 port 發出的連線請求");
});