# 执行上下文和作用域
## 代码的执行过程

分为解析阶段和执行阶段

**1.解析阶段**
  - 代码解析（Parse）会先在堆内存中创建一个`全局对象 Global Object` -> GO
  - 这个对象在所有作用域均可以访问到
  - 这个对象会包含Date Array String setInterval 等的全局对象和变量
  - 还有一个 window 对象指向自己-> GO
  - 遇到在全局定义的函数时，会在 GO 中给函数放置对应的 指针'0x0a' 地址，然后在这个起始地址处创建函数对象
    函数对象里包括了 scope (自身作用域) + parent scope (上层作用域) 和函数的代码块

**2. 运行代码**
 *  v8 为了执行代码, v8引擎内部会有一个执行上下文栈(Execution Context Stack ECStack)(函数调用栈)
 *  因为我们执行的是全局代码，为了全局代码能够正常的执行，需要创建全局执行上下文(Global Execution Context GEC)
 *  (全局代码需要被执行时才会创建)
 *  GES 会被放入 ECS 中执行
 *  在函数没有调用前，编译时只在 GO 生成对应的内存地址,并在调用后执行时会把函数执行上下文 (FEC) 压入调用栈中并且执行，完成后  弹栈并销毁（AO）
 * 遇到函数调用的时候会创建函数执行上下文 FEC 并放入全局上下文中这个时候需要 VO = AO 创建AO存放函数里的变量为undefined 然后开始执行函数代码，执行完后弹栈。

![image-20230610091031115](https://cyzblog-1305365553.cos.ap-guangzhou.myqcloud.com/image-20230610091031115.png)


## 作用域

作用域就是变量的有效范围。 在一定的空间里可以对数据进行读写操作，这个空间就是数据的作用域,
和规定了变量的生命周期.

分为全局作用域, 函数作用域,  块级作用域, 词法作用域

- 全局作用域 定义在全局上下文中的变量可以在代码的任何位置访问修改
- 函数作用域 定义函数内部的变量和函数,只能在函数内部访问,随着函数之后完后跟随着函数一起被销毁.
- 块级作用域 凡是代码块就可以划分变量的作用域,这种作用域被称为块级作用域.
- 词法作用域 是在代码解析阶段生成的.


## 变量作用域提升 (预解析)
**变量提升**
```js
console.log(age); // undefined
var age = 15;
foo()
function foo(){
    console.log(age);
}
```
在 js 代码解析时会先生成 GO, age 会以 undefined 的形式存在GO中

foo 会以 地址的方式存放在 GO 中

当代码执行到 `console.log(age);` 的时候回去GO找到 age = undefined 然后输出

当代码执行到 foo() 的时候, 会去 GO 找到 foo 的内存地址

函数和变量在定义时都提升到代码开头。而对于出现了同名的变量或者函数，最终生效的是最后一个（覆盖）。

`块级作用域不影响变量提升`
```js
  if(false){
    var name = 'ikun'
  }
```
在全局作用域下可以找到 name 变量

**函数提升**

函数的声明会被提到作用域的最上方,即使你将函数的调用放在定义函数的上面执行,也不会报错.
因为函数定义在代码的解析阶段, 会先被解析然后在执行时就可以被访问到.
:::info
函数表达式不存在函数的提升. 函数提升的优先级大于变量提升的优先级.
:::

例题
```js
function fn(a, c) {
  console.log(a)
  var a = 123
  console.log(a)
  console.log(c)
  function a() { }
  if (false) {
    var d = 678
  }
  console.log(d)
  console.log(b)
  var b = function () { }
  console.log(b);
  function c() { }
  console.log(c);
}
fn(1, 2)
```
<details><summary><b>答案</b></summary>
<p>
在 node 运行结果为

[Function: a]

123

[Function: c]

undefined

undefined

[Function: b]

[Function: c]

解释第一个 1. 函数的提升覆盖参数赋值
d 输出 undefined 是因为 `块级作用域不影响变量提升`
第一个 b 输出 undefined 是因为 `函数表达式不存在函数的提升`
</p>
</details>

## 作用域链
当代码在一个环境中执行时，会创建变量对象的一个作用域链由子级作用域返回父级作用域中寻找变量，就叫做作用域链

作用域链中的下一个变量对象来自包含环境，也叫外部环境。而再下一个变量对象
则来自下一个包含环境，一直延续到全局执行环境。全局执行环境的变量对象始终都是作
用域链中的最后一个对象

![scope](https://cyzblog-1305365553.cos.ap-guangzhou.myqcloud.com/scope.png)


在 bar 函数解析阶段 会在 创建一个变量对象 [[scope]] + parent[[scope]]

bar 函数执行阶段会先在自己的私有上下文中寻找,如果没有则往父级作用域(foo作用域)寻找 a, 找不到 会再往(foo作用域的上一级作用域寻找),

直到全局作用域, 如果找不到会报错

例题

```js
var n = 100

function foo1() {
  console.log(n);
}

function foo2() {
  var n = 200;
  console.log(n);
  foo1();
}

foo2();

console.log(n);
```

<details><summary><b>答案</b></summary>
<p>
200 100 100

foo1() 函数作用域定义在全局作用域下,会先在自己的函数作用域下查找 n, 找不到则往全局作用域下寻找.
</p>
</details>


补充一道题目
```js
var x = 1

function foo(x, y = function () { x = 3, console.log(x); }) {
  console.log(x); // 参数没赋值默认为undefined
  var x = 2;
  y() // 如果参数有默认值会形成自己的作用域输出 3,
  console.log(x); // 2
}

foo();
console.log(x); // 1
```

