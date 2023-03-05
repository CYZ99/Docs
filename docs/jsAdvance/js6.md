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

## 精度丢失问题
在 JS 中浮点数的计算存在丢失问题
0.1 + 0.2 != 0.3

在 JS 中浮点数是以64位二进制数存储的,{浮点数转换为 二进制数时会出现精度丢失}

`console.log((0.1).toString(2)) => 0.0001100110011001100110011001100110011001100110011001101`

计算方法
```js
0.1 * 2 = 0.2 => 0
0.2 * 2 = 0.4 => 0
0.4 * 2 = 0.8 => 0
0.8 * 2 = 1.6 => 1
0.6 * 2 = 1.2 => 1
0.2 * 2 = 0.4 => 0
```
**无穷数**
开始出现循环 0.1 转换为2进制数,会出现循环, 最多存储64位舍弃了一些值，值本身就失去了精准度

### 解决方法
1. 使用 toFixed() 保留小数点 N 位
2. 使用扩大系数法 `0.1 + 0.2 => 0.1 * 10 + 0.2 * 10 = 3 / 10 => 0.3`

原理就是将小数乘以一定的倍数转化为 整数在除以原来的倍数,得到小数.

**toFixed**
```js
  const num = (0.1 + 0.2).toFixed(2)
  console.log(num)
```

**扩大系数法**
```js
// 获取到系数
function getCoefficient(num) {
  // 转换为字符串
	num = num + ''
  // 以小数点分割
	let strArr = num.split('.')
  // 获取到小数点以外的数
	let len = strArr[1].length
  // 计算得出倍数
	let multiple = Math.pow(10, len) // 10 ** len
	return multiple
}

function plus(num1, num2) {
	// 参数处理
	num1 = +num1
	num2 = +num2
	// 获取较大的 系数
	let xi = Math.max(getCoefficient(num1), getCoefficient(num2));
	// 相加过程
	let sum = (num1 * xi + num2 * xi) / xi
	return sum
}

```