// url for testing
// https://www.twse.com.tw/exchangeReport/STOCK_DAY?
// response=json&
// date=20210501&
// stockNo=2603


const axios = require('axios');
const fs = require("fs");


// read file
function fsPromise() {
    return new Promise((resolve, reject) => { 
        fs.readFile("stock.txt", "utf8", (err, data) => {
            if (err) {
                reject(err);
            }
            // console.log(`search stockNo: ${data}`);
            resolve(data);
        });
    });
};   


// axios API
function searchStock(queryNum) {
    axios({
        method: 'get',
        url: 'https://www.twse.com.tw/exchangeReport/STOCK_DAY',
        params: {
            response: JSON,
            date: 20210501,
            stockNo: queryNum
        }
    })
        .then(function (response) {
            console.log(response.data)
        });
};


// read file and search
fsPromise()
    .then((result) => {
        return searchStock(result);
    })
    .catch((err) => {
        console.log(err);
    });