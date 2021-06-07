## 建立連線設定檔

#### 建置步驟

1. 複製範例檔案
```cp .env.example .env```
2. 設定 .env 檔案的環境變數

完成上述步驟便能在程式裡面引用連線資料。

```javascript
require('dotenv').config();
```