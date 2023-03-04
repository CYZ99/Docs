# 手写 call apply bind new

## call
核心原理就是

将原本需要执行的函数的 this 赋值给 call 传入的第一个参数的一个方法

在返回这个方法的调用结果

```js
Function.prototype.mycall= function(context, ...args){
  // 1. 对参数进行判断如果是 null 或 undefined 则将 context 视为 window
  context = context ? Object(context) : window
  // 2. 获取原本函数的 this
  context.fn = this
  // 执行 context.fn 方法
  const res= context.fn(...args)
  delete context.fn
  return res
}

```
## apply
```js
  Function.prototype.myApply = function (context,arr) {
  // 1. 处理参数1
  context = context ? Object(context) : window
  // 2. 处理参数2
  arr = arr ? arr : [] // 没有传入第二个参数,赋值为一个空数组
  // 3. 调用
  let fn = this
  context.fn = fn
  let res = context.fn(...arr)
  delete context.fn
  return res
}


function foo(num1, num2) {
  return num1 + num2
}
const res = foo.myApply('abc', [1, 2])
console.log(res);
```

## bind
bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，
而其余参数将作为新函数的参数，供调用时使用。
返回一个函数,不会像 call 和 apply 那样自动调用,需要将返回的函数手动调用.

```js
  Function.prototype.myBind = function (context, ...arrayArgs) {
  context = context ? Object(context) : window
  let fn = this
  function proxyFn(...args) {
    // 参数的处理
    let finallArgs = [...args, ...arrayArgs]
    context.fn = fn
    const res = context.fn(...finallArgs)
    delete context.fn
    return res
  }
  return proxyFn
}
function sum(num1, num2, num3, num4) {
  console.log(num1, num2, num3, num4);
  return num1 + num2
}

var newSum = sum.myBind('abc', 10, 20);
var result = newSum(30, 40);
```

## new

定义: new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
``` js
function create(Constructor, ...args) {
  // 1. 创建一个新对象
  const obj = new Object()
  // 2. 获取构造函数的 原型,赋值给 obj的 __proto__,
  // obj 可以访问到构造函数原型上的属性
  obj.__proto__ = Constructor.prototype;
  // 3. 将 this 指向新创建的实例
  Constructor.call(obj, ...args)
  return obj
}

function Car(color) {
  this.color = color;
}
Car.prototype.start = function () {
	console.log(this.color + ' car start');
};

var car = create(Car, 'black');
console.log(car.color); // black
car.start();

```