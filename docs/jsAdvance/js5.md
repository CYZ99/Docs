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
:::tip
未完待续
:::


## apply


## bind


## new