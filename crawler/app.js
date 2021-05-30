// url for testing
// https://www.twse.com.tw/exchangeReport/STOCK_DAY?
// response=json&
// date=20210501&
// stockNo=2603


// must be defined
const axios = require('axios');


// normal
// axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210501&stockNo=2603')
//   .then(function (response) {
//     // handle success
//     console.log(response.data.data);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });


// set stockNo
const fs = require("fs");

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