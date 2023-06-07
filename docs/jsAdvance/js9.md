# 闭包

要想清除的理解闭包,先简单的复习一下作用域相关的知识

## 全局作用域:
1. 定义在全局的变量称为全局变量, 变量默认绑定到全局  window 对象中作为其一个属性.


```js
  // 在非严格模式下
  var a = 10;
  console.log(window.a); // 10
```

## 局部作用域:
局部变量定义在函数内部
当函数执行完后局部变量会被销毁, 局部变量不会被污染,不可被重用.
注意: 函数参数形参变量也是局部变量.

不是 {} 才能形成作用域 对象的 {} 就不是一个作用域.


作用域链:
每个函数在定义时,就已经规划好了自己专属的一个查找变量的路线图,称为作用域链
当执行到某条语句时,JS引擎会自动沿着函数的作用域链查找需要的变量


```js
var i = 10;
function f(){
  var y = 2;
  function g(){
    var z = 10
    console.log(i);
  }
}
```
函数内层想要打印 i, 会先在 g 函数作用域中寻找是否定义了 i, 没找到,会沿着作用域链寻找 知道全局作用域都没寻找到该变量时,
就会报错 i is not defined



```js
var a = 10;
function fn(a){
  a++;
  console.log(a); //形参是局部变量
}
fn() // 11;
console.log(a) // 10
```

**作用域的本质**

全局作用域其实是一个 window 对象

在函数还没有执行之前函数的作用域是全局作用域
函数执行时的作用域
this 保存在函数作用域中
函数执行完作用域会被销毁

**函数作用域**

其实是JS引擎在调用函数时才临时创建的一个作用域对象,其中保函数的局部变量,而函数调用完,函数作用域对象就被释放了
函数作用域对象,还有个别名活动的对象 (Actived Object) AO,所以,局部变量不可重用.


## 闭包的概念:

闭包也是一个对象 Closure
闭包就是每次调用外层函数时临时创建的函数作用域对象.
为什么外层函数执行后不会被销毁,因为内层函数对象的作用域链引用着无法释放.

闭包的形成:
外层函数调用后,外层函数的作用域对象被返回的内层函数的作用域链引用着无法释放,就形成了闭包对象

```js
// 第一步使用外层函数包裹
function mother(){
  var total = 1000;
  // 在外层函数内部返回内层函数对象,给外层函数使用
  return function pay(money){
    total=-money
    console.log(`花了${money}还剩${total}元`)
  }
}
// 调用外层函数用变量接收返回值
var pay=mother()
pay(100) // 900
pay(100) // 800

```

内层函数的作用域链引用着外层函数 total 这个变量 因此形成闭包

当代码执行到 mother() 时形成两个作用域 全局作用域 和 Local 作用域 就是(mother)函数作用域

![image-20230523145016987](https://cyzblog-1305365553.cos.ap-guangzhou.myqcloud.com/image-20230523145016987.png)

当代码执行到  pay() 函数时 函数内部的作用域链对象引用了上层作用域的对象的变量形成闭包对象

![image-20230523145135006](https://cyzblog-1305365553.cos.ap-guangzhou.myqcloud.com/image-20230523145135006.png)

当 mother 函数执行完之后这个 AO 对象本该被释放,但是因为内层函数引用着 total 因此不会被释放, 产生了内存泄露.

## 相关题目
1. 匿名函数

匿名函数的几个特点
1. 不会在所处上下文（宿主环境）中进行声明：设置的名字在外面用不了

```js
(function fn() {
  let fn = 100
  console.log(fn);
})();
console.log(fn) // fn is not defined
```

```js
// 具名化使之可以使用递归
let num = 0
(function fn() {
  if (num >= 5) return
  num++;
  fn();
})();
console.log(num);
```

2. 闭包的简单运用
```js
// 页面中有五个按钮
var btnList = document.querySelectorAll('button');
for (var i = 0; i < btnList.length; i++){
  btnList[i].onclick = function () {
    console.log(`当前点击按钮的索引: ${i}`);
  }
}
```
这里的每一个按钮点击之后全部输出 i = 5
因为, 循环是同步执行的, 而事件绑定是异步执行的 当循环结束同步代码执行完了之后,在执行异步代码事件绑定而此时的 i 等于 5
还有 i是使用 var 声明的保存在全局中

解决方法利用闭包保存其每一次的循环产生的变量
```js
var btnList = document.querySelectorAll('button');
for (var i = 0; i < btnList.length; i++){
  (function (i){
      btnList[i].onclick = function () {
      console.log(`当前点击按钮的索引: ${i}`);
    }
  })(i)
}
```

```js
// 使用 let 产生 块级上下文 + 闭包也可以实现这一功能
let btnList = document.querySelectorAll('button');
for (let i = 0; i < btnList.length; i++) {
  btnList[i].onclick = function () {
    console.log(`当前点击按钮的索引: ${i}`);
  }
}
```

```js
// 使用事件委托 + 自定义属性来实现这一功能
document.body.onclick = function (ev) {
  let target = ev.target
  if (target.tagName === "BUTTON") {
    console.log(`当前点击按钮的索引是:${target.getAttribute('index')}`);
  }
}
```

题目

```js
let x = 5;
const fn = function fn(x){
  return function (y){
    console.log(y + (++x));
  }
}
let f = fn(6);
f(7); // y = 7 x = 6  7 + 7 = 14 0x001
fn(8)(9); // x = 8 y = 9  9 + 9 = 18 产生一个 fn新的上下文 0x002
f(10); // x 还是引用着上一层作用域(0x001)的 x = 7 10 + 8 = 18
console.log(x); // 5
```


```js
let a = 0,
  b = 0;
let A = function (a) {
  A = function (b) {
    alert(a + b++)
  }
  alert(a++);
}

// 第一次 A 执行一个函数 生成一个新的 A 函数 并且 a++
// 第二次执行的是新的函数  A(2) function(b) { alert (a + b++)} 上次的 a = 2 b = 2 => 2+2=4

// a = 0 var A = function(b){}
//
A(1); // a = 2
A(2); // 2 + 2
```
变量提升相关问题

```js

var a = 1;
function fn(a) {
  console.log(a); // f a() {}
  var a = 2;
  function a() { }
  console.log(a); // 2
}

fn(a);
console.log(a); // 1
```
当代码执行到 fn(a)

形参赋值的操作在变量提升之前,因此 a 刚开始是 1 函数作用域中有 a 无需再次声明. 但是function a(){} 会将函数声明并且定义函数

因为函数的提升会高于变量的提升.

第二次打印时: a = 2; 代码执行 a 被赋值为 2 因此输出 a 就是 2


```js
let a = 0,
  b = 0;
let A = function (a) {
  A = function (b) {
    alert(a + b++)
  }
  alert(a++);
}

// 第一次 A 执行一个函数 生成一个新的 A 函数 并且 a++
// 第二次执行的是新的函数  A(2) function(b) { alert (a + b++)} 上次的 a = 2 b = 2 => 2+2=4

// a = 0 var A = function(b){}
//
A(1); // a = 2
A(2); // 2 + 2
```



```js
// 自执行函数和 this 指向问题
var num = 10;
var obj = {
  num: 20
}

obj.fn = (function (num) {
  this.num = num * 3 // 自执行函数的 this 是 window 是全局的 num (num*3) num 是参数的 20 * 3 = 60
  num++; // 21
  return function (n) {
    this.num += n; // 第一次 this 是全局的 65  第二次执行 this 是 obj  20 + 10 = 30
    num++; // 闭包引用上一层作用域链下的 num
    console.log(num); // 22 23
  }
})(obj.num) // 自执行函数的返回值赋值给 obj.fn

var fn = obj.fn
fn(5); // 22
obj.fn(10) // 23
console.log(num, obj.num); // 65 30
```

形参相关题目

### 组合函数

```js
const a = x => x + 10;
const b = x => x - 10;
const c = x => x * 10;
const d = x => x / 10;

const compose = function compose(...funcs) {
    // funcs->[a,b,c,d]
    // compose函数作用：创建一个闭包，存储未来要执行函数的顺序
    return function handle(x) {
        // x->100
        let res; //用来接收函数执行的返回值
        funcs.forEach((func, index) => {
            if (index === 0) {
                // 第一个要执行的函数
                res = func(x);
                return;
            }
            // 其余要执行的函数
            res = func(res);
        });
        return res;
    };
};
let handle = compose(a, b, c, d);
console.log(handle(100)); //100
```


```js
const compose = function compose(...funcs) {
    funcs.forEach(func => {
        if (typeof func !== "function") {
            throw new TypeError('传递进来的值必须都是函数');
        }
    });
    return function handle(x) {
        let len = funcs.length;
        if (len === 0) return x;
        if (len === 1) return funcs[0](x);
        return funcs.reduce((x, func) => {
            if (typeof func !== "function") return x;
            return func(x);
        }, x);
    };
};
console.log(compose(a, b, c, d)(100)); //100
console.log(compose(d, b, c, a)(100)); //10
console.log(compose(d)(100)); //10
console.log(compose()(100)); //100
```



