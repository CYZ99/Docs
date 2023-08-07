# this 的绑定规则

概念: this 是函数运行时的当前对象

## this指向
this 的指向分为以下几种规则

默认绑定  隐式绑定  显示绑定  new 绑定  特殊情况

✨优先级

```js
function foo() {
  console.log(this);
}
foo() // window

let obj = {
  foo
}

obj.foo() // Object

foo.call('1') // String
```

::: tip
根据上面的代码得出以下几点结论
:::
- 函数在调用时会给 this 指定一个值
- this 的绑定和定义的位置没有关系
- this 的绑定和调用位置,调用方式有关
- this 的绑定发生在运行时下

## 默认绑定
this 在浏览器的全局环境下 指向 window

this 在 node 全局环境下指向一个 `{}`

在严格模式下函数内的 this 绑定的是 undefined

全局指向的 this 还是 window

1. 函数独立被调用会默认绑定 window

```js
// 案例 1
var a = 2 // 相当于 window.a = 2
function foo() {
  console.log(this.a);
}

foo(); // 2

// 案例 2
function bar() {
  console.log(this);
}

function baz() {
  console.log(this)
  bar() // 独立被调用
}

baz()

// 案例 3

const obj = {
  name: 'why',
  foo: function () {
    console.log(this);
  }
};

var bar = obj.foo;
bar(); // 独立函数调用 this 指向 window

// 案例 4
function bar() {
  return function bar1() {
    console.log(this);
  }
}

var fn = bar();
fn(); // window


```

严格模式下的 默认绑定的 this
```js
  "use strict"
  function bar(){
    console.log(this)
  }
  bar() // undefined
  console.log(this) // window
```

## 隐式绑定
object.fn() JS 引擎会将`fn`函数的`this`默认绑定到 object 这个对象

this 会指向最后调用它的对象.
```js
  function foo(){
    console.log(this)
  }
  let obj = {
    name: 'obj',
    foo
  }
  obj.foo() // 指向 obj

  let obj1 = {
    name: 'obj1',
    foo
  }
  let obj2 ={
    name:'obj2',
    obj1
  }
  obj2.obj1.foo() // obj1
```

**例题2**

```js
function foo() {
  console.log(this.a)
}
function bar(fn) {
  console.log(this) // obj2
  fn() // 独立调用
}
var obj = { a: 1, foo }
var a = 2
var obj2 = { a: 3, bar }

obj2.bar(obj.foo)
```
这里结果是 obj2 2

bar 函数是 obj2 调用因此 bar里的 this 指向 obj2

但里面的 fn() 这个函数的调用还是 独立调用 this 指向 window
## 显示绑定

使用 `call()` `apply()` `bind()` 函数 直接指定 `this` 的绑定对象
- 使用 call() 和 apply() 调用的函数会自动执行
- 而 bind() 是生成一个新函数 需要自己调用
- call() 和 apply() 的区别 是 call 的第二个参数 是接收参数列表, 而apply的 第二个参数是接收数组

```js
function foo(){
  console.log(this.a)
}
const obj = {
  a: 2
}
foo.call(obj) // 2
```

```js
  function bar(num1, num2){
    console.log(num1, num2, this)
  }
  const obj = {
    num1: 10,
    num2: 20
  }
  bar.apply(obj, [obj.num1, obj.num2])
  const newFn = bar.bind(obj, 10, 20)
  newFn()
```

bind() 方法绑定的函数,返回一个原函数的拷贝，并拥有指定的 this 值和初始参数

需要自己调用这个新函数

如果这三个函数的参数列表为空并且处于非严格模式下,则指定为 null 或 undefined 时会自动替换为指向全局对象。

返回函数型

举个🌰
```js

function foo() {
  console.log(this.a);
  return function () {
    console.log(this.a);
  }
}

const obj = {
  a: 2
}
var a = 1

foo() // 1
foo.call(obj) // 2
foo().call(obj) // 1 2
foo.call(obj)() // 2 1

```
在 浏览器环境下的运行结果为 1 2 1 2 2 1

`foo.call(obj)` 会将 obj 作为 foo 的 this对象 调用 foo() 函数但返回的函数并没有被调用

`foo().call(obj)` 先调用 foo() 此时的 this 指向全局的 window 返回的函数this绑定为 obj 在调用输出为 1, 2

`foo.call(obj)()` 先调用 foo() 此时的 this 为 obj 返回的函数独立调用 this指向为 全局 window 在调用输出为 1, 2

### forEach map filter 等一些方法的第二个参数可以指定 this
```js
function foo(item) {
  console.log(item, this.name);
}
const arr = [1, 2, 3]

const obj = {
  name: 'ikun',
  age: 18
}

arr.forEach(foo, obj)
```

## new 绑定

通过new创建一个函数是（构造器），这个时候this是在调用这个构造器时创建出来的对象

this <=> 创建出来的对象

这个绑定过程就是 new 绑定

:::tip
new 调用的过程会发生如下操作
:::

1. 创建一个新对象
2. 这个对象的原型会被绑定到构造函数的`prototype`上 `user.__proto__ = User.prototype`
3. 这个新对象会被绑定到 函数的调用的this上
4. 如果没有返回其他对象,表达式会返回这个对象

```js
function User(name, age){
  this.name = name
  this.age = age
  console.log(this)
}

const user = new User('cyz', 18)
console.log(user.name, user.age)

```

🌰2

```js
function Person(name, age) {
  this.name = name
  this.foo = function () {
    console.log(this.name, age)
  }
  this.bar = function () {
    return function () {
      console.log(this.name, this.age)
    }
  }
}
var person1 = new Person('person1', 18)
person1.foo()
person1.bar()()
```

输出: person1 18 ' ' undefined

函数 foo 通过 person1 对象调用 输出 `person1  18`

函数 bar 调用后返回一个函数 这个函数是独立调用的

全局作用域下没有 age 返回 undefined 而 name 在 window 中为 `' '`

