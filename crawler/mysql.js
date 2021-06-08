// use packages
const axios = require('axios');
const fs = require("fs/promises"); // Promise base
const dayjs = require('dayjs');
const mysql = require('mysql');
const Promise = require('bluebird');
require('dotenv').config(); // dotenv


// get local date
const today = dayjs().format('YYYYMMDD');


// create connection
let connection = mysql.createConnection({
	host     : process.env.DB_HOST,
  	port     : process.env.DB_PORT,
	user     : process.env.DB_USER,
	password : process.env.DB_PASSWORD,
	database : process.env.DB_NAME,
});


// promisify mysql with bluebird's method
connection = Promise.promisifyAll(connection);


// go
(async function() {
	try {
		await connection.connectAsync();

		// let stockCode = await fs.readFile("stock.txt", "utf8");

		// // repeat?
		// let num = await connection.queryAsync('SELECT stock_id FROM stock WHERE stock_id = ?', [stockCode]);
		// if (num.length > 0) throw '該筆資料已存在';

		// // exist?
		// let response = await axios.get(`https://www.twse.com.tw/zh/api/codeQuery?query=${stockCode}`);
		// let symbol = response.data.suggestions[0];
		// if (symbol === '(無符合之代碼或名稱)') throw '無符合之代碼或名稱';

		// // query success
		// let target = response.data.suggestions
		// 	.map((item) => {
		// 		return item.split('\t');
		// 	})
		// 	.find((item) => {
		// 		return item[0] === stockCode;
		// 	});

		// // insert success
		// await connection.queryAsync('INSERT INTO stock (stock_id, stock_name) VALUES (?, ?)', target);

		// query();

		let queryArr = await connection.queryAsync('SELECT stock_id FROM stock');
		// let stock = queryArr[0]['stock_id'];
		// 
		// let totalSt = queryArr.length;
		// let queryRes = await axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?', {
		// 	params : {
				// response: JSON,
				// date: today,
				// stockNo: stock
		// 	}
		// });
		// console.log(queryRes.data.fields);
		// console.log(queryRes.data.data[0]);
		let result = queryArr.map(async (stocks) => {
			// return stocks['stock_id'];
			let stock = stocks['stock_id'];
			let data = await axios({
				method: 'get',
				url: 'https://www.twse.com.tw/exchangeReport/STOCK_DAY',
				params: {
					response: JSON,
					date: today,
					stockNo: stock
				}
			});
			// 處理資料
			// insert data
			if (data.data.data !== undefined) console.log(data.data.data);
		});
		

	} catch (err) {
		console.log('error');
		console.error(err);
	} finally {
		console.log('finally')
		connection.endAsync();
	};
})();

async function query() {
	console.log('jump to query');
};