# let var const 的区别

## let 和 var 的五点不同
**1. 在全局上下文中, 基于 var/function 声明的变量是给 window(GO) 设置的全局属性**

基于 let / const 声明的变量是放在 VO(G)中的和 GO 没有任何关系

```js
  var a = 12
  console.log(a); // 先看 VO(G)中 有没有,没有在看 GO 中是否存在
  console.log(window.a); // 直接到 GO 中查找
  d = 100 // 先看 VO(G) 中是否存在 d 如果存在则修改全局变量值, 如果不存在,则直接给 GO 设置 d 的属性
  let age = 18
  console.log(window.age) // undefined
```

**2. let 不允许变量重复声明**
而 var 允许重复声明, 会覆盖之前的值
在上下文中[不论当前上下文中以何种方式声明过这个变量,都不允许声明这个变量,在词法解析阶段]

```js
  let a = 10
  let a = 11 // Uncaught SyntaxError: Identifier 'a' has already been declared

  var b = 11
  let b = 10 // Uncaught SyntaxError: Identifier 'a' has already been declared

  var bar = 10
  var bar = 11
  console.log(bar) // 11
```

**3. let 不存在变量提升,不允许在定义之前使用**

```js
console.log(a); // undefined
var a = 10
console.log(b); // Cannot access 'b' before initialization
let b = 12
```

**4. 块级作用域的问题 let 声明的变量会产生块级上下文**
```js
{
  var a = 12
  let b = 13
}

console.log(a); // 12
console.log(b); // b is not defined
```

**5. 暂时性死区**

ES6中，在代码块内，使用let / const命令声明变量之前，
该变量都是不可用的，在变量声明之前属于该变量的“死区”。这在语法上，
 称为“暂时性死区”（temporal dead zone，简称 TDZ）。ES标准并没有明确提出TDZ

## const

基于 const 声明的变量 首先必须赋值为初始值,而且一旦和一个值关联,后期不允许修改

```js

const a = 12
// 对象中的值可以被修改
const obj = { name: 'zhudeng' }
obj.name = 'cyz'
console.log(obj);
```

同样使用 `const` 定义的变量没有变量提升, 不允许重复声明 也会产生块级格式上下文, 也存在暂时性死区