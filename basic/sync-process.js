// Promise 執行程序示範
// sync 版本


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