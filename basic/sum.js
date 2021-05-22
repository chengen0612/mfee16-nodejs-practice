function sum(n) {
    let result = 0;
    for(let i=0; i<=n; i++) {
        result += i;
    };
    // console.log(result);
    return result;
};

// sum(1);
// sum(2);
// sum(5);
// sum(10);
// sum(100000);
console.log(sum(1));
console.log(sum(5));
console.log(sum(100000));