#### (1) 請問下列程式執行後的結果為何？為什麼？

```javascript
console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 1000);
})();

console.log("end");
```

console:  
  start  
  IIFE  
  end  
  Timeout
  
why:
  函式中的setTimeout被設定為一秒後執行，因此Timeout會在最後才被印出。

---

#### (2) 請問下列程式執行的結果為何？為什麼？

```javascript
console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 0);
})();

console.log("end");
```

console:  
  start  
  IIFE  
  end  
  Timeout

why:
  雖然setTimeout被設置為立刻執行，然而由於setTimeout被web API執行後被傳送到task queue裡面待機。Timeout字串依然在最後才被印出。

---

#### (3) 請問下列程式執行的結果為何？為什麼？

```javascript
const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  bar();
  baz();
};

foo();
```

console:  
  foo  
  bar  
  baz

why:
  函式foo由上至下執行並按照執行順序依序印出三個字串。

---

#### (4) 請問下列程式執行的結果為何？為什麼？

```javascript
const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  setTimeout(bar, 0);
  baz();
};

foo();
```

console:  
  foo  
  baz  
  bar

why:
  函式foo由上至下執行並在執行setTimeout後將bar丟給webAPI處理，因此bar會等到最後才被印出。
