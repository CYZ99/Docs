# JS 数据类型

## JS 原始值类型/引用数据类型
原始值类型(基本数据类型) : number, string, boolean, null, undefined, symbol bigint

引用数据类型(对象类型)
- 标准普通对象 object
- 标准特殊对象 Array、RegExp、Date、Math、Error…
- 非标准特殊对象 Number、String、Boolean
- 可调用/执行对象 函数，function

引用数据类型的一道题目
```javascript
// 数据类型的概念
let a = {
  name: 'julia',
  age: 24
}

function change(o) {
  o.age = 25
  o = {
    name: 'cyz',
    age: 22
  }
  return o
}

let b = change(a)
console.log(b.age);
console.log(a.age);
```

<details><summary><b>答案</b></summary>
<p>

答案: 22 25

函数参数传入的是 a对象的引用地址.因此 `o.age` 会修改 `a.age 为25`

当 执行到 `o = {name: 'cyz', age: 22 }` o 指向一个新的引用地址
函数返回了一个新的对象
</p>
</details>

## 数据类型检测
### 检测数据的类型的几种方法
  方法一 : **typeof**

    直接在计算机底层基于数据类型的值（ 64位二进制值 ）进行检测
    找二进制前三位 000 object null 全是0
  - typeof 返回一个指示数据类型的 `字符串`
  - typeof null => "object"，`对象存储在计算机中都是以 000 开始的二进制存储`，
  - null也为 000 三个0 开头的都是对象
  - typeof 普通对象/数组对象/正则对象/日期对象 "object"
  - typeof function(){} => "function"
  - typeof NaN => "number"
  - typeof 111n => "bigint"
  - typeof Symbol() "symbol"
  - typeof Date() =>  string
  - typeof new Date() => object

  - typeof a => undefined a 是一个未声明的值
  ::: info
  使用 typeof 无法识别具体的对象类型 也无法正确的识别 `null`
  想要正确的识别 `null` 可以使用 `===` 运算符 或者 Object.propotype.toString()
  :::
  方法二: **instanceof**
  - instanceof 检测当前实例是否属于这个类的
  - 底层机制： `只要当前类出现在原型链上，结果都是 true`
  - 无法检测对象是普通对象 还是特殊对象如  Array
  - 由于我们可以随意的修改原型的指向，导致检测的结果不准
  - 无法检测基本数据类型
  ```js
    let arr = [];
    console.log(arr instanceof Array); // => true
  ```
  ::: warning
  需要注意的是， instanceof 的结果并不一定是可靠的，因为在 ECMAScript7 规范中可以通过自定义 Symbol.hasInstance 方法来覆盖默认行为。
  :::
  ::: tip
    手写一个instanceof
  :::
  ```js
  function my_instanceof(left, right){
    if(typeof left !== 'object' && left === null) return left
    let prop = Object.getPrototypeOf(left)
    while(true){
      if(prop === right.prototype) return true
      if(prop === null) return false
      prop = Object.getPrototypeOf(prop)
    }
  }
  ```

  方法三 **constructor**
  - 基于构造函数检测数据类型
  - 比 instanceof 好用一些 可以检测基本数据类型
  - constructor 可以被随意的修改，不准确
  ```js
  let array = [];
  let n = 1;
  // Number.prototype.constructor = 'AA'; 修改
  console.log(array.constructor === Array);  // => true
  console.log(array.constructor === RegExp); // => false
  ```

  方法四 **Object.prototype.toString.call([value])**
  - 标准检测数据类型的方法 Object.prototype.toString不是转换为字符串，是返回`当前实例所属类`的信息
  - 标准检测的办法"[object Number/String/Boolean/Null/Undefined/Symbol/Object/Array/RegExp/Date/Function]"

  ```js
  let obj = {}
  console.log(obj.toString()) // "[object Object]" 返回的是字符串
  ```
  原理: `this` 指向 `obj` 使用 `call` 改变 `this` 的指向来获得数据的类型
  ::: tip
    手写一个 getType
  :::
  ```js
    function getType(obj) {
      let type = typeof obj
      if(type !== "object") return type
      return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
    }
  ```
  ::: info
  判断数组可以使用 Array.isArray([])
  :::
## 数据类型转换
### 原始值之间的相互转换
**规则**

1.字符串转换为数字：空字符串变为0，如果出现任何非有效数字字符，结果都是NaN

2.把布尔转换为数字：true -> 1 false -> 0

3.null -> 0 undefined -> NaN

4.Symbol无法转换为数字，会报错：`Uncaught TypeError:Cannot convert a Symbol value to a number`

5.BigInt去除“n”(超过安全数字的，会按照科学计数法处理)

1. 转为 Number
```js
// 1. 原始值转换为数值
console.log(Number(undefined)); // NaN
console.log(Number(null)); // 0
console.log(Number(true));
console.log(Number("")); // 字符串里面为空字符串的话  0
console.log(Number("0123")); // 123
console.log(Number('123'));
console.log(Number('casc')); // NaN
console.log(Number('123casc')); // NaN
console.log(Number(Infinity)); // Infinity 是一个数字
console.log(Number(10n)); // 10
```
2. 原始值转换为 String
```js
console.log(String(undefined)); // "undefined"
console.log(String(null)); // "null"
console.log(String(true)); // "true"
console.log(String(12)); // "12"
let sStr = Symbol('aaa');
console.log(String(sStr)); // "Symbol(aaa);"
console.log(String(10n)); // "10"
```

3. 原始值转换为 Boolean
```js
// 只有 7种值可以被转换为 false
// falsey (虚值)
console.log(Boolean());
console.log(Boolean(false));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean(-0));
console.log(Boolean(+0));
console.log(Boolean(""));
console.log(Boolean(NaN));
```
::: info
对象转换为布尔值都为 true
:::

### 对象与原始值之间的转换
**规则**

把对象转换为数字：
+ 先调用对象的Symbol.toPrimitive这个方法，如果不存在这个方法
+ 再调用对象的va1ue0f获取原始值，如果获取的值不是原始值
+ 再调用对象的toString把其变为字符串
+ 最后再把字符串基于Number方法转换为数字

```js
let obj = {
  value: 1,
  valueOf() {
    return 2
  },
  toString() {
    return 3
  },
  [Symbol.toPrimitive]() {
    return 4
  }
}

console.log(obj + 1); // 5
console.log({}.valueOf()); // 返回 {} 引用值
console.log({}.toString()); // 返回 "[object Object]"
// 调用 valueOf 返回的不是原始值,调用 toString 方法返回字符串在进行字符串相加
console.log({} + 10); // "[object Object]10"
console.log([1,2,3,4,5] + 10); // 数组同样调用 toString()  返回 '1,2,3,4,510'

let time = new Date()
console.log(Number(time));
// 先检测 Symbol.toPrimitive 有而且是个函数
// time[Symbol.toPrimitive]('number')
```


数组和普通对象没有 [Symbol.toPrimitive] 方法

对象转换为字符串的规则
1. 先调用 toString()
2. 如果返回 引用值调用 valueOf()
3. 如果 valueOf() 返回引用值时
4. 去原型上找到 toString() 方法

```js
  let test1 = {
  toString() {
    return 1;
  },
  valueOf() {
    return 2;
  }
}
console.log(String(test1)); // '1'

// 返回空字符串 '' 数组上的 toString() 返回的是去除中括号后的东西
console.log(String([])); // ''
console.log(String({}));
```

**例题二**
```js
let arr = [10];
console.log(Number(arr));
// 首先 arr[Symbol.toPrimitive] -> undefined
// 其次 arr.valueOf() 获取原始值->[10]不是原始值
// 再此 arr.toString() 转换为字符串->'10'
// 最后再把字符串'10'转化为数字 -> 10
```
### parseInt
parseInt([val], [radix])
+ [val]必须是字符串，如果不是，要先隐式转换为字符串String([val])
+ [radix]进制
+ 如果不写，或者写零：默认是10（特殊情况：如果字符串是以0x开始的，默认值是16）
+ 有效范围：2~36之间（如果不在这个区间，结果直接是NaN)
+ 从[val]字符串左侧第一个字符开始查找，查找出符合[radix]进制的值（遇到不符合的则结束查找，不论后面
是否还有符合的)；把找到的内容，按照[radix]进制，转换为10进制!

> parseInt('10102px13', 2) 找到符合二进制的·1010'

把这个二进制的值转换为10进制`按权展开求和`
`1 * 2^3 + 0 * 2^2 + 1 * 2^1 + 0 * 2^0 => 8 + 0 + 2 + 0 => 10`
### '+' 转换规则
“+”出现左右“两边”，其中一边是字符串，或者是某些对象：会以字符串拼接的规则处理
"+" 出现再一个值的左边,转换为数字 +num

> let result = 100 + true + 21.2 + null + undefined + "Tencent" + null + 9 + false;

<details><summary><b>答案</b></summary>
<p>
  NaNTencentnull9false
</p>
</details>

## 相等性判断
::: tip
  使用 Object.is(NaN, NaN) 解决 NaN 不等于 NaN
:::
```js
console.log(NaN === NaN); // false
console.log(+0 === -0); // false
console.log(Object.is(NaN, NaN)); // true
```

### 隐式类型转换
1. 隐式转换为boolean

> if() while() for(, ,) switch || ! !! ?

2. == !==
等于和不等于运算符 需要将两边的 数据转换为 number 类型在进行比较

特例:
`undefined == null`

'1' == true

题目
1 && 2 && {}

<details><summary><b>答案</b></summary>
<p>

答案: {}

1 => true 2 => ture 第三个后面没有运算符直接返回 {}
</p>
</details>

```js
console.log([] == ![]); // true
// 1. ! 运算符 优先级大于 ==  ![] 转换为 false
//  [] == false => [] == 0  [].toString() => '' => 0 == 0
console.log(false == []); // true
console.log(false == undefined); 0 == NaN // false
console.log(!![]); //true

```


