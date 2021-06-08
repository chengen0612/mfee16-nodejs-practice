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

// insert stock name
(async function() {
	try {
		await connection.connectAsync();

		let stockCode = await fs.readFile("stock.txt", "utf8");

		// repeat?
		// let num = await connection.queryAsync('SELECT stock_id FROM stock WHERE stock_id = ?', [stockCode]);
		// if (num.length > 0) throw '該筆資料已存在';

		// exist?
		let response = await axios.get(`https://www.twse.com.tw/zh/api/codeQuery?query=${stockCode}`);
		let symbol = response.data.suggestions[0];
		if (symbol === '(無符合之代碼或名稱)') throw '無符合之代碼或名稱';

		// find target
		let target = response.data.suggestions
			.map((item) => {
				return item.split('\t');
			})
			.find((item) => {
				return item[0] === stockCode;
			});

		// insert into stock table
		await connection.queryAsync('INSERT IGNORE INTO stock (stock_id, stock_name) VALUES (?, ?)', target);

		// jump
		return gainData(stockCode);

	} catch (err) {
		console.error(err);
		connection.endAsync();
	};
})();

// insert stock data
async function gainData(stockCode) {
	try {
		// query data
		let querryRes = await axios({
			method: 'get',
			url: 'https://www.twse.com.tw/exchangeReport/STOCK_DAY',
			params: {
				response: JSON,
				date: today,
				stockNo: stockCode
			}
		});
		
		if (querryRes.data.stat !== 'OK') throw '查無資料';
		
		// edit data format
		let catcher = querryRes.data.data.map((obj) => {
			obj = obj.map((value) => {
				return value.replace(/,/g, '');
			});
	
			obj[0] = (Number(obj[0].replace(/\//g, '')) + 19110000).toString();
			obj[0] = dayjs(obj[0]).format('YYYY-MM-DD'); // format()
	
			obj.unshift(stockCode);
			return obj;
		});
	
		// multiple insert
		let result = await connection.queryAsync('INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?', [catcher]);
	
		// result message
		if (result.affectedRows > 0) {
			console.log(`成功新增${result.affectedRows}筆資料`)
		} else {
			console.log('已經新增至最新資料');
		};

	} catch (err) {
		console.error(err);
		
	} finally {
		connection.endAsync();
	};
};