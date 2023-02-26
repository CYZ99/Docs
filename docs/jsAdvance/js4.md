# this 指向规则二

:::tip
本文的调试环境是在 浏览器环境下调试
:::
## 特殊情况
1. 定时器
2. 触发事件回调
3. 箭头函数
4. 间接函数引用

### 定时器
定时器内部的函数到了定时的时间会自动执行
```js
setTimeout(function() {
  console.log(this)
}, 1000)
```
这里输出的 this 指向 window (浏览器环境下)

相当于 setTimeout 函数在调用回调函数式是独立调用的

### 点击事件

```js
const boxEl = document.querySelector('.box');
// 相当于隐式绑定 boxEl.onclick() 这里的 this 被绑定到 boxEl 中
// 把函数传递给浏览器，跟浏览器内部如何调用有关
boxEl.onclick = function () {
  console.log(this);
}
```
### 箭头函数
箭头函数默认没有 this 会去上层作用域寻找 this

箭头函数会指向其定义时的上层作用域

:::info
箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，
如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined。
:::

```js
  const obj = {
  name: 'obj',
  foo: () => {
    console.log(this.name);
  },
  bar: function () {
    console.log(this.name);
    return () => {
      console.log(this.name);
      }
    }
  }

  var name = 'ikun'
  obj.foo()
  obj.bar()()
```

`foo` 箭头函数调用时会去外层作用域寻找 `this` 这里的外层作用域就是全局作用域,输出 `ikun`

`bar` 函数调用之后返回一个箭头函数 这里的 `this` 指向 `bar` 作用域 输出 `obj`

**应用场景**

```js

var obj = {
  data: [],
  getData: function () {
    // var _this = this;
    // setTimeout(function () {
    //   var result = ["abc", 'cba', 'nba']
    //   this.data = result; // 这里的 this 的指向是 window
    // }, 2000)
    // 箭头函数之后
    setTimeout(() => {
      var result = ['abc', 'cba', 'nba']
      this.data = result // 这里的this的指向是 obj
    },2000)
  },
}

obj.getData()

```
定时器的回调函数默认绑定的是全局作用域下的 `window`

在箭头函数之前只能声明一个 `_this` 来获取 外层作用域下的 `this`


给 `setTimeout` 添加一个 箭头函数 充当回调,可以自动地获取上层作用域下的 `this`


**构造函数中的 返回箭头函数**
```js
var name = 'window'
function Person(name) {
  this.name = name
  this.foo1 = () => {
    console.log(this.name)
    return function () {
      console.log(this.name)
    }
  }
  this.foo2 = () => {
    console.log(this.name)
    return () => {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')

person1.foo1()() // person1 window
person1.foo2()() // person1 person1


```
**1:**
`foo1` 箭头函数的 `this` 指向上层作用域也就是 `Person` 函数的作用域 输出 `person1`

而返回的是一个匿名函数 并且独立调用 `this => window` 输出 `window`

**2:**
`foo2` 箭头函数的 `this` 跟上面的一样输出 `person1`

返回的是一个箭头函数 上层作用域指向的是 `foo2` 箭头函数

而 `foo2` 的`this` 指向了 `Person` 构造函数 输出 `person1`

:::tip
对于箭头函数 的 `this` 是在定义时找到他的上层作用域,
将上层作用域中的 `this` 作为 箭头函数的 `this` 不是在执行时寻找 `this`
箭头函数的this是无法通过`bind、call、apply`来直接修改.
:::


### 间接函数引用
```js
  var obj = {
  name: 'obj1',
  foo: function () {
    console.log(this);
  }
};

var obj2 = {
  name: 'obj2',
};

// 特殊情况,这里相当于拿到了 函数 foo 独立调用，绑定到window
(obj2.bar = obj.foo)()
```
这里相当于 调用 `foo()` 返回 window
## 不同绑定的优先级

1. 默认绑定的优先级最低
2. 显示绑定优先级高于隐式绑定
3. new 优先级高于隐式绑定和显示绑定


**显示绑定高于隐式绑定**
```js
function foo() {
  console.log(this.name)
}

const obj = {
  name: '123',
  foo
}

const obj2 = {
  name: 'abc'
}
obj.foo()
obj.foo.call(obj2)
```

输出 123 abc

`call` 显示调用的优先级高于隐式调用

## 题目
1.
```js
var name = 'window'

var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
}

function sayName() {
  var aa = person.sayName;
  aa();
  person.sayName();
  (person.sayName)();
  (b = person.sayName)();
}

sayName();

```
<details><summary><b>答案</b></summary>
<p>
window person person window
</p>
<p>
aa() 独立函数调用 person.sayName() (person.sayName)() 一样都是隐式调用

最后一个是间接函数引用 其实就是 b() 独立调用
</p>
</details>


2.
```js
  var name = 'window'

var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name);
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name);
    }
  }
}

var person2 = { name: 'person2' }

person1.foo1();
person1.foo1.call(person2);

person1.foo2();
person1.foo2.call(person2);

person1.foo3()()
person1.foo3.call(person2)();
person1.foo3().call(person2);

person1.foo4()();

person1.foo4.call(person2)();
person1.foo4().call(person2);

```
<details><summary><b>答案</b></summary>
<p>
foo1:
person1 person2

foo2:
window window

foo3:
window window person2

foo4:
person1 person2 person1

</p>
</details>

对于 foo2:

第一个常规的隐式调用但是函数箭头函数 因此 this绑定的上一层作用域的 window

第二个使用 call() 显示调用但是 call() 不能改变 箭头函数的 this 因此同上

对于 foo3:

第一个函数调用是隐式调用 返回普通函数 的独立调用 输出 window

第二个函数 返回的函数还是普通函数的独立调用 输出 window

第三个函数 返回普通函数后使用 call(person2) 来调用 输出 person2

3
```js
  var name = 'window'

function Person(name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  },
  this.foo2 = () => console.log(this.name),
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  },
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}

var person1 = new Person('person1')
var person2 = new Person('person2')


person1.foo1() // person1
person1.foo1.call(person2) // person2

person1.foo2() // person1
person1.foo2.call(person2) // 上层作用域的this指向 person1

person1.foo3()() // 独立调用 window
person1.foo3.call(person2)() // window
person1.foo3().call(person2) // person2

person1.foo4()() // 箭头函数。找上层作用域 person1
person1.foo4.call(person2)() //  foo4.call(person2) this绑定为person2 () 箭头函数上层作用域为 person2
person1.foo4().call(person2) // 箭头函数 找上级作用域 person1

```

4
```js
var name = 'window'

function Person(name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name);
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name);
      }
    }
  }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()(); // window
person1.obj.foo1.call(person2)(); // window
person1.obj.foo1().call(person2); // person2

person1.obj.foo2()(); // obj
// 这里foo2.call(person2)使用call调用函数将this绑定为person2，()箭头函数 找上层作用域 person2
person1.obj.foo2.call(person2)();
person1.obj.foo2().call(person2);
// 这里foo2() 调用完之后，使用call改变箭头函数的this指向但是没用，箭头函数的this绑定的是上层作用域的this"obj"


```
