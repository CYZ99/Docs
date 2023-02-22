# 深浅拷贝
1. 是什么
2. 应用场景
3. 优缺点
4. 手写实现

赋值：把一个对象赋值给一个新的变量时，赋的其实是该对象的在栈中的地址，而不是堆中的数据。

浅拷贝：重新在堆中创建内存，拷贝前后对象的基本数据类型互不影响，但`拷贝前后对象的引用类型因共享同一块内存`，会相互影响。

深拷贝：从堆内存中开辟一个新的区域存放新对象，对对象中的子对象进行递归拷贝， 使用一块新的内存存放子对象，前后的两个对象互不影响。
## 浅拷贝
### 概念
创建一个新的对象，来接收你要重新复制或引用的对象值。

如果对象属性是基本的数据类型，复制的就是基本数据类型的值；
但如果属性是引用数据类型，复制的就是内存中的地址(没有开辟新的内存空间), 如果其中一个对象改变了这个内存中的地址，肯定会影响到另一个对象
```js
  const obj = {name: 'ikun', friend:{name: 'cxk'}}
  const newObj = Object.assign(obj)
  console.log(newObj)
  obj.friend.name = 'xiaoheizi'
  console.log(newObj) // friend:{name: 'xiaoeheizi'}
```

### 实现方式
四种实现方式
方式一 Object.assign(traget, source)

Object.assign() 方法将所有`可枚举（Object.propertyIsEnumerable() 返回 true）的自有（Object.hasOwnProperty() 返回 true）`属性从一个或多个源对象复制到目标对象，返回修改后的对象。
```js
const obj = {
  name: 'ikun',
  friend: {
    heizi: 'jntm',
  }
}
const newObj = {}
Object.assign(newObj, obj)
console.log(newObj);
```


方式二 扩展运算符
```js
const obj = {
  name: 'ikun',
  friend: {
    heizi: 'jntm',
  }
}
const newObj1 = { ...obj }
console.log(newObj1);
```
方式三 数组的 concat
```js
const arr = [1, 2, { name: 'cxk' }]
const newObj2 = arr.concat()
console.log(newObj2);
```
方式四 数组的 slice
```js
const arr = [1, 2, { name: 'cxk' }]
const newArray = arr.slice(0,3)
console.log(newArray);
```
:::
::: tip
  手写一个浅拷贝
:::
```js
  const shallowClone = (traget) => {
    if(typeof traget === 'object' && traget !== null){
      const cloneObj = Array.isArray(traget) ? [] : {}
      for(let prop in target ){
        if(target.hasOwnproperty(prop)){
          cloneObj[prop] = target[prop]
        }
      }
      return cloneObj
    } else {
      return target
    }
  }
```

## 深拷贝
浅拷贝只是创建一个新对象，复制了原有对象的基本类型的值。
对于复制引用类型的值，在堆内存中完全开辟了一块内存地址，并将原有的对象完全的复制过来
### 概念
将一个对象从内存中完整地拷贝出来一份给目标对象，并从堆内存中开辟一个全新的内存空间存放新对象。对象中的子对象会被递归的拷贝。
并且新对象的修改不会改变源对象, 实现真正的分离

### 实现
**普通版**
 `JSON.stringify(obj)` `JSON.parse(obj)` 实现
使用 JSON 转换的方式来写深拷贝,

问题：
1. 对象内的函数
2. symbol 值不会被处理
3. 不支持循环引用

```js
  const obj = {
    name: 'james',
    age: 38
    friend: {
      name: 'curry'
    }
  }
  const newObj = JSON.parse(JSON.stringity(obj))
```

**进阶版**

使用 `Reflect.ownKeys()` 可以遍历到 Symbol 类型的键，和不可枚举的属性,
对函数进行处理, 返回原来的函数即可.

用法：静态方法 `Reflect.ownKeys()` 返回一个由目标对象自身的属性键组成的数组。

它的返回值等同于 `Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))`

```js
function isObject(value) {
  return (typeof value === 'object' || typeof value === 'function') && (value !== null)
}

function deepClone(originValue) {
  if (!isObject(originValue)) {
    return originValue
  }
  // 对函数进行处理
  if (typeof originValue === 'function') {
    return originValue
  }

  const newObject = Array.isArray(originValue) ? [] : {}
  // 没有源对象 将源对象 作为 key 新对象作为值
  map.set(originValue, newObject)
  // 使用 Reflect.ownKeys 可以遍历到 Symbol 类型的键,和不可以枚举的 属性
  for (const key of Reflect.ownKeys(originValue)) {
    newObject[key] = deepClone(originValue[key])
  }
  return newObject
}

const obj = {
  name: 'james',
  age: 32,
  friend: {
    name: 'james'
  },
}
obj.info = obj // 循环引用
const newObj = deepClone(obj)
```
无法解决循环引用问题：

代码运行后直接报错：Maximum call stack size exceeded，调用栈溢出，
因为我们的需要拷贝的源对象存在循环引用，所以deepClone 函数会不断入栈，最后栈溢出。

分析：当函数遍历到对象 obj 中的 info key 时会调用 deepClone(originValue[key]), 这个方法 而此时 originValue[key] = obj
会再次递归的遍历下去,第二次遍历到还是同样遍历下去 deepClone 函数不断地入栈，最后导致栈溢出。

解决办法：
引入 WeakMap
将源对象作为 key 新对象作为值 存放在 map 中


**我们只需要在每次对复杂数据类型进行深拷贝前保存其值，在创建一个新对象之前先判断 map中是否存在其值 在 map 出现了该值,直接返回，不用创建新的对象。**

**高级版**

::: tip
  手写一个深拷贝，解决循环引用问题
:::

```js
function isObject(value) {
  return (typeof value === 'object' || typeof value === 'function') && (value !== null)
}

function deepClone(originValue, map = new WeakMap()) {
  if (!isObject(originValue)) {
    return originValue
  }
  if (typeof originValue === 'function') {
    return originValue
  }

  // 循环引用问题 在对象生成前判断 是否存在 map 中
  if (map.has(originValue)){
    return map.get(originValue)
  }

  const newObject = Array.isArray(originValue) ? [] : {}
  // 没有源对象 将源对象作为 key 新对象作为值 存放在 map 中
  map.set(originValue, newObject)

  for (const key of Reflect.ownKeys(originValue)) {
    newObject[key] = (isObject(originValue[key]) && typeof obj[key] !== 'function') ? deepClone(originValue[key], map) : originValue[key]
  }
  return newObject
}
```

