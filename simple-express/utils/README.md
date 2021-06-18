## 建立連線設定檔

相關檔案: `db.js` `.env` `.env.example`

###### 建置步驟

1. 複製範例檔案
```bash
cp .env.example .env
```
2. 設定 .env 檔案的環境變數
3. npm i dotenv
4. 在 db.js 裡引用 dotenv
```javascript
require('dotenv').config();
```
5. 使用 dotenv 的預設方法取得 .env 檔案裡的連線設定 