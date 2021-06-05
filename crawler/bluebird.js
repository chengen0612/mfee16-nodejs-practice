// 練習用 bluebird 套件包裝 callback 版本的 readfile 套件
// ===================================================

// url for testing
// https://www.twse.com.tw/exchangeReport/STOCK_DAY?
// response=json&
// date=20210501&
// stockNo=2603


// use packages
const axios = require('axios');
const fs = require("fs"); 
const dayjs = require('dayjs');
const Promise = require("bluebird"); // 覆蓋原生函式


// get local date
const today = dayjs().format('YYYYMMDD');


// read file
// Promise.promisify(<package>);
// bluebird 提供函式，把套件 Promise 化
// Promise 化的套件還是可以支援原生函式庫
const readFileBlue = Promise.promisify(fs.readFile); 


// read file and search
readFileBlue("stock.txt", "utf8")
    .then((stockCode) => {
        return axios({
            method: 'get',
            url: 'https://www.twse.com.tw/exchangeReport/STOCK_DAY',
            params: {
                response: JSON,
                date: today,
                stockNo: stockCode
            }
        })
    })
    .then((result) => {
        if (result.status === 200 ) {
            console.log(result.data.date);
            console.log(result.data.title);
        };
    })
    .catch((err) => {
        console.log(err);
    });