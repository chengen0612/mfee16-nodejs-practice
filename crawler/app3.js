// url for testing
// https://www.twse.com.tw/exchangeReport/STOCK_DAY?
// response=json&
// date=20210501&
// stockNo=2603


// use packages
const axios = require('axios');
const fs = require("fs");


// get local date
const now = new Date().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'});
// 2021/5/31 上午9:50:23
const sep = now.split(' ');
const date = sep[0].split('/');

const year = date[0];
const month = (date[1] > 10) ? date[1] : '0' + date[1];
const day = (date[2] > 10) ? date[2] : '0' + date[2];

const today = `${year}${month}${day}`;


// read file
function fsPromise() {
    return new Promise((resolve, reject) => { 
        fs.readFile("stock.txt", "utf8", (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};   


// read file and search
fsPromise()
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