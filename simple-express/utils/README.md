## db 連線

相關檔案: `db.js` `.env` `.env.example`

1. 複製範例檔案
```bash
cp .env.example .env
```
2. 設定 .env 檔案的環境變數
3. npm i dotenv
4. 在 db.js 裡引用 dotenv
```javascript
require('dotenv').config();
// 預設路徑為專案目錄，可以加上套件參數更改路徑
```
5. 使用 dotenv 的預設方法取得 .env 檔案裡的連線設定 

<br>

## session 加密

相關檔案: `server.js` `.env` `.env.example`

1. 參考 .env.example
2. 新增加密參數 `SESSION_SECRET`
3. 在主程式引用 dotenv
4. 在中間件裡使用加密參數