// get local date
const now = new Date().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'});
// 2021/5/31 上午9:50:23
const sep = now.split(' ');
const date = sep[0].split('/');

const year = date[0];
const month = (date[1] > 10) ? date[1] : '0' + date[1];
const day = (date[2] > 10) ? date[2] : '0' + date[2];

const today = `${year}${month}${day}`;