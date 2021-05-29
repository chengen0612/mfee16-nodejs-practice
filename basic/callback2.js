// callback hell

let doWork = function (job, timer, callback) {
  setTimeout(() => {
    let now = new Date();
    // callback(false, success)
    callback(null, `完成工作: ${job} at ${now.toISOString()}`);
  }, timer);
};
  
let now = new Date();
console.log(`開始工作 at ${now.toISOString()}`);
doWork("刷牙", 2000, function (err, result) {
  if (err) {
    console.error(err);
    return;
  };
  console.log(result);
  // callback
  doWork("吃早餐", 3000, function (err, result) {
    if (err) {
      console.error(err);
      return;
    };
    console.log(result);
    // another callback 
    doWork("寫功課", 5000, function (err, result) {
      if (err) {
        console.error(err);
        return;
      };
      console.log(result);
      // more callback
      doWork("吃午餐", 3000, function (err, result) {
        if (err) {
          console.error(err);
          return;
        };
        console.log(result);
      });
    });
  });
});