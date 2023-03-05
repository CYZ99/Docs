# 常用的字符串方法

## 字符串属性
字符串的 length 只读属性,可以获取到字符串的长度
```js
let str = 'cacasc'
console.log(str.length); // 6
```
## 字符串方法
### 字符串拼接
concat

将多个字符串拼接成一个新的字符串,不会修改原始的字符串.
性能方面不如 `+  +=` 拼接模式
```js
let str = 'Hello'
let str1 = 'World'
let newStr = str.concat(str1) // HelloWorld
let newStr1 = 'Hello' + str1
```

### 字符串包含
- includes(searchString, [position])

判断字符串中是否存在特定的字符, 返回值是一个 布尔值.区分大小写

第二个参数是指定从字符串的哪个索引开始查询是可选参数
```js
let str = 'Hello';
let str1 = 'World';
let newStr = str.concat(str1);
let newStr1 = 'Hello' + str1;

console.log(newStr1.includes('Hello'));
console.log(newStr1.includes('World1'));
```

### 字符串索引
- indexOf lastIndexOf 区分大小写
用法 `indexOf(searchString [,position])` 返回值是一个索引,如果没有找到返回 -1

第二个参数是指从字符串的哪个索引开始查询
```js
const firstIndex = newStr1.indexOf('o');
console.log(newStr1.indexOf('o', firstIndex + 1));
```

用法 `lastIndexOf(searchString [,fromIndex])` 反向查询返回值是一个索引,如果没有找到返回 -1

```js
console.log(newStr1.lastIndexOf('o'));
console.log(newStr1.lastIndexOf('o'));
console.log(newStr1.lastIndexOf('o', firstIndex));
```

### 提取字符串
- slice 返回一个新的字符串,不会改变原来的字符串.

第二个参数是指定分割的结尾.
返回一个新的字符串

用法 `str.slice(beginIndex [,endIndex])`
```js
let str2 = 'the cute cat '
let newStr2 = str2.slice(4, 8)
console.log(newStr2) // cute
```

- split
返回源字符串以分隔符出现位置分隔而成的一个 Array
当字符串为空时，split() 返回一个包含一个空字符串的数组，
而不是一个空数组，如果字符串和分隔符都是空字符串，则返回一个空数组
第二个参数 是用来限制返回的字符串块的个数的
```js
let str3 = 'the lazy dog'
let newStr3 = str3.split(' ')
let str4 = ''
let newStr4 = str4.split('');
console.log(newStr4); // []
console.log(newStr3); // [ 'the', 'lazy', 'dog' ]

let str5 = 'lbj curry kd'
let newStr5 = str5.split(' ', 2)
console.log(newStr5); ['lbj', 'curry'];
```

### 字符串替换
replace() 方法返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。如果pattern是字符串，则仅替换第一个匹配项。
语法
`str.replace(regexp|substr, newSubStr|function)`

```js
// 1
let str = 'textbook'
const newStr = str.replace('text', 'note')
console.log(newStr); // notebook

// 2 正则
const reg = /text/ig
const newStr1 = str.replace(reg, 'note');
console.log(newStr1); // notebook
```

**startsWith**
startsWith() 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。

语法 `str.startsWith(searchString[, position])`

```js
let str = 'hello world'
const bool =  str.startsWith('hello')
console.log(bool); // true

console.log(str.startsWith('hello', 2)); //fasle
```

**endWith**
endWith() 方法用来判断当前字符串是否以另外一个给定的子字符串结尾，并根据判断结果返回 true 或 false。

```js
let str = 'Is this a question?'
console.log(str.endsWith('?')); // true
console.log(str.endsWith('question')); // false
```

### 字符串大小写转换

将字符串转换为小写,返回一个新的字符串,不会修改原来的字符串
str.toLowerCase()
```js
let str = 'THIS A APP'
console.log(str.toLowerCase()); // this a app
```

str.toUpperCase()
```js
let str1 = 'this a app'
console.log(str1.toUpperCase()); // THIS A APP
```

### 字符串裁剪

substring

substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集，或从开始索引直到字符串的末尾的一个子集。

```js
let str = 'Hello World!'
console.log(str.substring(6, 11)); // World

```
