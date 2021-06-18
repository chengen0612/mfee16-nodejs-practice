// 告訴程式自訂模組的路徑，然後不用寫 .js
const pack = require('./car');

// obj
console.log('obj: ', pack.car);

// string
console.log('string: ', pack.name);

// function
let color = pack.getColor();
console.log('func: ', color);

// function
pack.setColor('red');