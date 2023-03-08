# CSS 动画

##  transition 结合  transform

​	transition 的属性有 `transtion-property` `transiton-duration` `transition-timing-function` `transition-delay`

transition 过渡,使用这个 css 属性可以制作一些简单的动画. 过渡可以为一个元素在不同状态之间切换的时候定义不同的过渡效果。比如在不同的伪元素之间切换，像是 [`:hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover)，[`:active`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:active) 或者通过 JavaScript 实现的状态变化。

第一个属性值 选择要过渡的属性, 第二个属性值是 动画执行的总时间, 第三个属性值是使用过渡函数,

 `ease`   规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）（相对于匀速，中间快，两头慢）。  `ease-in` 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）（相对于匀速，开始的时候慢，之后快）

 `ease-in-out `  规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）（相对于匀速，（开始和结束都慢）两头慢）。

`ease-out`  规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）（相对于匀速，开始时快，结束时候间慢，）。  `step-start`  `linear` 匀速

第四个属性是延迟一定的时间在执行过渡属性



`transition`属性可以被指定为一个或多个 CSS 属性的过渡效果，多个属性之间用逗号进行分隔。

所有属性 `all` `none` 选择 所有或者全部不选



```css
/* property name | duration | timing function | delay */
transition: margin-right 4s ease-in-out 1s;
```

transform 几个常用的属性

1. translate 位移

```css
transform: translate(x, y, z); 
transform: translate(10px, 20px, 10px);
transform: translate(-50%, -50%);
transform: translateX(100px);
transform: translateY(100px);
transform: translateZ(100px);
```



几个需要注意的点

x, y, z 代表的是 x轴  y轴  z轴 

正值默认往 右 下 扩大 (透视) 

使用百分比的单位相对于自身偏移

transtion属性是给需要动画的元素添加



2 rotate 旋转

`transform: rotate(45reg)`

单位可以使用 reg 角度 ,也可以时 1trun 代表旋转一圈

旋转角度为正值则顺时针旋转,为负值则逆时针旋转

默认的中心点是元素的中心,使用 `trasform-origin: left center`

可以设置旋转中心点位



3 scale 缩放

`transform: scale(1)`

给的值大于1放大,小于1缩小,相对于元素中心缩放



注意点: 多个属性一起设置时需要注意顺序

多重变换， 先移动，后旋转  多个变化效果用空格隔开 

` transform: translateX(400px)  scale(0.5) rotate(360deg);`



##  animation

1. 使用 @keyframes 定义动画 

2. animation 调用动画

使用 @keyframes 定义动画

写法一 : 使用 from to 两个状态

```css
@keyframes move{
	from{
		translate: translateX(0px) rotate(0deg); 
	}
	to{
		translate: translateX(100px) rotate(45deg); 
	}
}
```

写法二: 使用百分比

```css
@keyframes run{
    0% {
        transform: translate(0, 0);
      }

    25% {
        transform: translate(500px, 0);
    }

    50% {
        transform: translate(500px, 300px);

    }

    75% {
        transform: translate(0, 300px);

    }

    100% {
        transform: translate(0, 0);
    }
}
```



调用动画

`animation: move 2s;`



动画的属性值 

animation: 动画名称 持续时间  速度曲线 延迟时间 重复次数 设置方向 播放状态

```css
@keyframes duration | easing-function | delay |
iteration-count | direction | fill-mode | play-state | name 
```

`animation: move 2s linear 0 infinite` 

动画名字:调用你设置的动画

持续时间: 动画执行的总时间

速度曲线: 基本和`transition` 一致

方向: 

```
normal
```

每个循环内动画向前循环，换言之，每个动画循环结束，动画重置到起点重新开始，这是默认属性。

```
alternate
```

动画交替反向运行，反向运行时，动画按步后退，同时，带时间功能的函数也反向，比如，`ease-in` 在反向时成为 `ease-out`。计数取决于开始时是奇数迭代还是偶数迭代

```
reverse
```

反向运行动画，每周期结束动画由尾到头运行。

```
alternate-reverse
```

反向交替，反向开始交替。动画第一次运行时是反向的，然后下一次是正向，后面依次循环。决定奇数次或偶数次的计数从 1 开始。

重复次数: `animation-iteration-count: 2;`  值为数字循环 2次  `infinite` 无限循环

动画暂停:  `animation-play-state: paused;`

使用多组动画中间使用逗号间隔: `animation: move 2s,run 4s;`



































