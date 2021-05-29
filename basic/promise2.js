// solution to callback hell

/*
  和callback3.js比較
  ・成功或失敗的判斷只要寫一次
  ・程式架構更具可讀性
*/

let doWorkPromise = function (job, timer, success) {
	return new Promise((resolve, reject) => {
	  setTimeout(() => {
      let now = new Date();
      if (success) {
        return resolve(`完成工作: ${job} at ${now.toISOString()}`);
      }
      reject(`!!工作失敗: ${job} at ${now.toISOString()}`);
	  }, timer);
	});
};

// 刷完牙 > 吃早餐 > 寫功課
// Promise.then.catch
// Promise chain
doWorkPromise("刷牙", 2000, true)
	.then((result) => {
	  console.log(result);
	  return doWorkPromise("吃早餐", 3000, true);
	})
	.then((result) => {
	  console.log(result);
	  return doWorkPromise("寫功課", 5000, true);
	})
	.then((result) => {
	  console.log(result);
	})
	.catch((err) => {
	  console.error("發生錯誤", err);
	})
	.finally(() => {
	  console.log("我是 Finally");
	});