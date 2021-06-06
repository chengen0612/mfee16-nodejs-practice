// nodejs 內建套件，不用外連
const http = require("http");

// createServer(Listener)
// Listener(request, respone) 
// request 是請求物件
// response 是回覆物件
// 試著console.log()看看req裡面有什麼
const server = http.createServer((req, res) => {
    console.log("收到連線請求");
    console.log(req.url); // 查看請求連線

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain;charset = UTF-8");

    switch (req.url) {
        case "/" :
            res.end("這是首頁");
            break;
        case "/test" :
            res.end("這是測試頁");
            break;
        case "/about" :
            res.end("這是關於我們");
            break;
        default:
            res.writeHead(404);
            res.end("查無此網頁");
    };
});


// server.listen(port, callback function)
// port 網路協定
server.listen(3000, () => {
    console.log("設置連線監聽事件: 接收3000port的請求")
})

const connection = mysql.createConnection();

connection.connect