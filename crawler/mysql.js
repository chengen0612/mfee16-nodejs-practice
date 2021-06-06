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
		let stockCode = await fs.readFile("stock.txt", "utf8");
		// verification
		let ver = await connection.queryAsync(`SELECT stock_id FROM stock WHERE stock_id = '${stockCode}'`);
		if (ver.length === 0) {
			let response = await axios.get(`https://www.twse.com.tw/zh/api/codeQuery?query=${stockCode}`);
			if (response.status === 200){
				// console.log('query success');
				let target = response.data.suggestions
					.map((item) => {
						return item.split('\t');
					})
					.find((item) => {
						return item[0] === stockCode;
					});
				// insert
				await connection.queryAsync(`INSERT INTO stock (stock_id, stock_name) VALUES ('${target[0]}', '${target[1]}')`);
        console.log('insert success');
			};
		} else {
			console.log('該筆資料已存在');
		};
	} catch (err) {
		console.error(err);
	} finally {
		connection.endAsync();
	};
})();