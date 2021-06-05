// 上課示範的執行程序範例



// let b = 0;  // --> 1

// // 2 new promise
// let testPromise = new Promise((resolve, reject) => {
//   // 3 做加法
//   let a = 2 + 3;
//   // 4 印出來
//   console.log("inside");

//   resolve(a);
// });
// // 5 promise 已經準備好了，可以給暗樁了

// // 6 印出 promise obj Promise { 5 }
// console.log(testPromise);
// // 7 「設定」排隊回來之後要幹嘛
// testPromise.then((result) => {
//   // 因為 11 所以這邊開始執行
//   b = result;
//   console.log(b);
// });
// // 8 印出來
// console.log(b);
// // 9 印出來
// console.log("outside");
// // 10. event loop 發現 stack 空，去 queue 搬東西
// // 11 event loop 搬 jab 回 stack

// =================================

// console.log("Start 1");
// setTimeout(()=>{
//   console.log("Timeout 2 "); // --> Libuv
// }, 0);
// console.log("End 3");

const fs = require("fs");
let b = 0; // --> 1

// 2 new promise
let testPromise = new Promise((resolve, reject) => {
  // 3 做加法
  let a = 2 + 3;
  // 4 印出來
  console.log("inside");
  // 5 「開始」讀檔案
  fs.readFile("quiz.md", (err, result) => {
    console.log("讀完檔案");
    if (err) {
      reject(err);
    }
    resolve(result);
  });
});
//  6 promise 已經準備好了，可以給暗樁了

// 7 印出 promise obj Promise { pending }
console.log(testPromise);
// 8 「設定」排隊回來之後要幹嘛
testPromise.then((result) => {
  // 因為 93
  b = result;
  console.log("then");
});
// 9 印出來
console.log(b);
// 10 印出來
console.log("outside");

// 11 Event loop 就會去看 Q，因為檔案未讀完，所以 Q 空，沒東西搬
// 12 Event loop 就會去看 Q，因為檔案未讀完，所以 Q 空，沒東西搬
// ....
// 89 Event loop 就會去看 Q，因為檔案讀完，所以 Q 有東西了 --> readFile 的 cb
// 90 cb --> stack
// 91 因為成功，所以在 cb 裡呼叫了 resovle <-- promise
// 92 resovle -> micro queue
// 93 因為 stack 又空了，Event loop 就會去看 Q ，有 resovle -> 丟回 stack