// built-in modules below, no need to install
const http = require('http');
const { URL } = require('url');
const fs = require('fs/promises');

// set up server maker
// check out what's inside the request obj with console
const server = http.createServer(async (req, res) => {
  // handle incoming request here
  console.log('收到連線請求...');
  console.log('請求連線到網址:', req.url); // url client trying to access

  // deal with req.url
  // remove query string, unnecessary / at the end, also force the whole url into lowercase
  const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLocaleLowerCase();

  // create url obj
  const url = new URL(req.url, `http://${req.headers.host}`);

  // basic settings
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8');

  switch (path) {
    case '' :
      res.end('這是首頁');
      break;
    case '/test' :
      // return specific page
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      const response = await fs.readFile('test.html');
      res.end(response);
      break;
    case '/about' :
      // use query parameters
      const params = url.searchParams;
      const name = params.get('name') || '訪客'; // default setting behind
      res.end(`Hi, ${name}\n這是關於我們`);
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