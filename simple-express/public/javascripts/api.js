// 讀取 /api/stock 的資料

// alert('hiiiiii');

// $.ajax({
//   type: 'GET',
//   url: '/api/stock',
// }).done((data) => {
//   console.log(data);
// }).fail((error) => {
//   console.log(error);
// }).always(() => {
//   console.log('end if ajax');
// });

// axios.get('/api/stock')
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log('end of axios');
//   });

fetch('/api/stock')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  });