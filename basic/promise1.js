// Promise intro

// new Promise(function (resolve, reject) {});

// 返回Promise物件的函式
let doWorkPromise = function (job, timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let now = new Date();
      // resolve(); 成功
      resolve(`完成工作: ${job} at ${now.toISOString()}`);
      // reject(); 失敗
      reject("故意錯誤");
    }, timer);
  });
};

// 變數宣告一個新的Promise物件
let brushPromise = doWorkPromise("刷牙", 2000);
console.log(brushPromise);

// 執行Promise物件
brushPromise
.then((result) => {
  // fulfilled 處理成功 resolve
  console.log(result);
})
.catch((err) => {
  // rejected 處理失敗 reject
  console.error("發生錯誤", err);
});