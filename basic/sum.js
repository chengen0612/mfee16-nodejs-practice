function sum(n) {
    let result = 0;
    for(let i=0; i<=n; i++) {
        result += i;
    };
    console.log(result);
};

sum(1);
sum(2);
sum(5);
sum(10);
sum(100000);