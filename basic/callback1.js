// callback intro
// 重用性高且較富彈性

function sum(n, callback) {
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
  }
  callback(result);
}
  
function reportAns(ans) {
  console.log(`Hi, 答案是 ${ans}`);
}

function reportAns2(ans) {
  console.log(`Hello, 答案是 ${ans}`);
}

sum(5, reportAns);
sum(10, reportAns2);