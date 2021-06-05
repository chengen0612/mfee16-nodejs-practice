// url for testing
// https://www.twse.com.tw/exchangeReport/STOCK_DAY?
// response=json&
// date=20210501&
// stockNo=2603


// use packages
const axios = require('axios');
const fs = require("fs/promises"); // Promise base
const dayjs = require('dayjs');


// get local date
const today = dayjs().format('YYYYMMDD');


// read file
function readFile() {
    return fs.readFile("stock.txt", "utf8");
};


// query
function queryStock(symbol) {
    return axios({
        method: 'get',
        url: 'https://www.twse.com.tw/exchangeReport/STOCK_DAY',
        params: {
            response: JSON,
            date: today,
            stockNo: symbol
        }
    });
};


// run
(async function() {
    let stockCode = await readFile();
    let response = await queryStock(stockCode);
    if (response.status === 200) {
        console.log(response.data.date);
        console.log(response.data.title);
    } else {
        console.log("發生錯誤: 資料查詢失敗");
    };
})();