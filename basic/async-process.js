// 上課示範的執行程序範例


// 1 宣告b
let b = 0;

// 2 new promise
// 6 宣告 testPromise 為 <fulfilled> 狀態的 Promise { 5 } 物件
let testPromise = new Promise((resolve, reject) => {
  // 3 做加法
  let a = 2 + 3;
  // 4 印出來
  console.log("inside");
  // 5 設定promise為fulfilled狀態且回傳值為a
  resolve(a);
});

// 7 印出 promise obj Promise { 5 }
console.log(testPromise);
// 8 testPromise已完成，then()裡的函式進queue排隊準備異步調用
testPromise.then((result) => {
  // 因為 12 所以這邊開始執行
  b = result;
  console.log(b);
});
// 9 印出來
console.log(b);
// 10 印出來
console.log("outside");
// 11 event loop 發現 stack 空，去 queue 搬東西
// 12 event loop 搬 job 回 stack

// =================================


const fs = require("fs");

// 1 宣告b
let b = 0;

// 2 new promise
// 6 宣告testPromise 為 <pending> 狀態的 promise 物件
let testPromise = new Promise((resolve, reject) => {
  // 3 做加法
  let a = 2 + 3;
  // 4 印出來
  console.log("inside");
  // 5 非同步函式進queue，Promise沒有得到結果，狀態為pending
  fs.readFile("quiz.md", (err, result) => {
    console.log("讀完檔案");
    if (err) {
      reject(err);
    }
    resolve(result);
  });
});

// 7 印出 promise obj Promise { pending }
console.log(testPromise);
// 8 設定fs.readFile()從queue返回結果後做什麼事
testPromise.then((result) => {
  // 因為 92 開始執行
  b = result;
  console.log("then");
});
// 9 印出來
console.log(b);
// 10 印出來
console.log("outside");

// 11 Event loop 去看 Q，因為檔案未讀完，所以 Q 空，沒東西搬
// 12 Event loop 去看 Q，因為檔案未讀完，所以 Q 空，沒東西搬
// ....
// 89 Event loop 去看 Q，因為檔案讀完，所以 Q 有東西了 ， 
// 90 把 readFile 的 callback 搬回 stack 執行， Promise 被定義為 <fulfilled> 狀態並獲得回傳值
// 91 Promise 被實現後執行 then() 方法異部調用當中的函式
// 92 因為 stack 又空了，Event loop 去看 Q ，把 then() 丟出去的函式調用回來