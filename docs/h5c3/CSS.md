
![](https://cdn.nlark.com/yuque/0/2022/jpeg/27950320/1670389994318-408d695d-1fa0-45b7-bad1-13122c2edce0.jpeg)
# css 基础知识
## 选择器

1. id 选择器
2. 类选择器
3. 通配符选择器
*{}
4. 标签选择器
5. 并集选择器 div, span{}
6. 交集选择器 div.box{} 将选中div标签且含有box类的选择器
7. 伪类选择器和伪元素
a:hover{}
p::first-line{}
8. 后代选择器
article p
9. 子代选择器
article > p
10. 相邻兄弟选择器
h1 + p
11. 通用兄弟选择器
h1 ~ p
12. 标签属性选择器
a[href="[http://example.com](http://example.com)"]
13. 补充
```html
<div>这是后代选择器</div>
<div>
  <p>这是div的儿子p</p>
</div>
```
子代选择器
只选子代儿子
```css
div > a{
  color: red;
}

```
交集选择器
将 div 标签且含有 box 类的选择器
div.box{
color:red
}
```css
div p {
  // 只对p标签有用
  color: red;
}
```
:::info
**伪类和伪元素**
:::
伪类是选择器的一种，它用于选择处于特定状态的元素，比如当它们是这一类型的第一个元素时，或者是当鼠标指针悬浮在元素上面的时候。它们表现得会像是你向你的文档的某个部分应用了一个类一样，帮你在你的标记文本中减少多余的类，让你的代码更灵活、更易于维护。伪元素不会存在 dom 树中

伪元素以类似方式表现，不过表现得是像你往标记文本中加入全新的 HTML 元素一样，而不是向现有的元素上应用类。伪元素开头为双冒号::。

生成带有::before 和::after 的内容
有一组特别的伪元素，它们和 content 属性一同使用，使用 CSS 将内容插入到你的文档中中。

你能用这些插入一个文本字符串，和在下面的实时示例里那样。试着改变 content 属性的文本值，看看输出是怎么改变的。你也能改变::before 伪元素为::after，看到这段文本插入到了元素的末尾而不是开头。

::before 和::after 中双冒号和单冒号有什么区别、作用?
区别
在 CSS 中伪类一直用 : 表示，如 :hover, :active 等
伪元素在 CSS1 中已存在，当时语法是用 : 表示，如 :before 和 :after
后来在 CSS3 中修订，伪元素用 :: 表示，如 ::before 和 ::after，以此区分伪元素和伪
类
由于低版本 IE 对双冒号不兼容，开发者为了兼容性各浏览器，继续使使用 :after 这种老
单冒号 (:) 用于 CSS3 的伪类
双冒号（::） 用于 CSS3 的伪元素
想让插入的内容出现在其它内容前，使用::before，否则，使用::after；
在代码顺序上， ::after 生成的内容也比::before 生成的内容靠后

新增的伪类和伪元素
CSS3 新增伪类
```css
`p:first-of-type`  选择属于其父元素的首个<p>元素
`p:last-of-type` 选择属于其父元素的最后<p>元素
`p:nth-child(n)` 选择属于其父元素的第 n 个子元素并且必须是<p>元素
`p:nth-last-child(n)`  选择属于其父元素的倒数第 n 个子元素并且必须是<p>元素
`p:nth-of-type(n)` 选择属于其父元素第 n 个<p>元素
`p:nth-last-of-type(n)`  选择属于其父元素倒数第 n 个<p>元素
`p:last-child`  选择属于其父元素最后一个子元素的并且必须是<p>元素
```
 伪元素

::first-letter
::first-line  将样式添加到文本的首字母
将样式添加到文本的首行
::before 在某元素之前插入某些内容
::after 在某元素之后插入某些内容






:::info
#### 冲突规则, 优先级
:::

- 层叠：
   - 简单的说，css 规则的顺序很重要；当应用两条同级别的规则到一个元素的时候，写在后面的就是实际使用的规则。

下面的例子中，我们有两个关于 h1 的规则。h1 最后显示蓝色 — 这些规则有相同的优先级，所以顺序在最后的生效。

```css
h1 {
  color: red;
}
h1 {
  color: blue;
}
```

-  优先级：
   -  浏览器是根据优先级来决定当多个规则有不同选择器对应相同的元素的时候需要使用哪个规则。
它基本上是一个衡量选择器具体选择哪些区域的尺度：
      - 一个元素选择器不是很具体 — 会选择页面上该类型的所有元素 — 所以它的优先级就会低一些。
      - 一个类选择器稍微具体点 — 它会选择该页面中有特定 class 属性值的元素 — 所以它的优先级就要高一点。

！ Important>行内样式>ID 选择器>类选择器>标签>通配符>继承>浏览器默认属性

下面的 h1 最后会显示红色 — 类选择器有更高的优先级，因此就会被应用即使元素选择器顺序在它后面。

```css
.h1 {
  color: red;
}
h1 {
  color: blue;
}
```
继承特性
**能继承的属性**

1. 字体系列属性:font、 font-family、 font-weight、 font-size、 font-style;
2. 文本系列属性:
2.1）内联元素： color、 line-height、 word-spacing、 letter-spacing、
text-transform;
2.2）块级元素： text-indent、 text-align;
3. 元素可见性： visibility
4. 表格布局属性： caption-side、 border-collapse、 border-spacing、 empty-cells、
table-layout;
5. 列表布局属性： list-style

**不能继承的属性**

6. display：规定元素应该生成的框的类型;
7. 文本属性： vertical-align、 text-decoration;
8. 盒子模型的属性： width、 height、 margin 、 border、 padding;
9. 背景属性： background、 background-color、 background-image;
10. 定位属性： float、 clear、 position、 top、 right、 bottom、 left、 min-width、
min-height、 max-width、 max-height、 overflow、 clip;
-
控制文字的属性都能继承,反之不行,超链接文字的颜色继承不了
自己没有的属性才会继承父类的
标题字体无法继承父类的

控制继承
inherit
设置该属性会使子元素属性和父元素相同。实际上，就是 "开启继承".

initial
设置属性值和浏览器默认样式相同。如果浏览器默认样式中未设置且该属性是自然继承的，那么会设置为 inherit 。
unset
将属性重置为自然值，也就是如果属性是自然继承那么就是 inherit，否则和 initial 一样

重设所有属性值
CSS 的 shorthand 属性 all 可以用于同时将这些继承值中的一个应用于（几乎）所有属性。它的值可以是其中任意一个 (inherit, initial, unset, or revert)。这是一种撤销对样式所做更改的简便方法，以便回到之前已知的起点。

优先级
(行内, id, 类, 标签)
!important 最高
继承: 最低
千位： 如果声明在 style 的属性（内联样式）则该位得一分。这样的声明没有选择器，所以它得分总是 1000。
百位： 选择器中包含 ID 选择器则该位得一分。
十位： 选择器中包含类选择器、属性选择器或者伪类则该位得一分。
个位：选择器中包含元素、伪元素选择器则该位得一分
这样可以避免重复的 CSS。一种常见的做法是给基本元素定义通用样式，然后给不同的元素创建对应的类。

## 盒子模型

-  块级盒子
   - 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽
   - 每个盒子都会换行
   - width 和 height 属性可以发挥作用
   - 内边距（padding）, 外边距（margin）和 边框（border）会将其他元素从当前盒子周围“推开”
-  内联盒子（inline）
   - 盒子不会产生换行。
   - width 和 height 属性将不起作用。
   - 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 inline 状态的盒子推开。
   - 水平方向的内边距、外边距以及边框会被应用且会把其他处于 inline 状态的盒子推开。

用做链接的  a 元素、img_ 以及 ** 都是默认处于 inline 状态的。**_

display 属性可以改变盒子的外部显示类型是块级还是内联，这将会改变它与布局中的其他元素的显示方式。

- 什么是 CSS 盒子模型

完整的 CSS 盒模型应用于块级盒子，内联盒子只使用盒模型中定义的部分内容。模型定义了盒的每个部分 —— margin, border, padding, and content —— 合在一起就可以创建我们在页面上看到的内容。为了增加一些额外的复杂性，有一个标准盒模型的和替代（IE）的盒模型。

- Content box: 这个区域是用来显示内容，大小可以通过设置 width 和 height.
- Padding box: 包围在内容区域外部的空白区域； 大小通过 padding 相关属性设置。
- Border box: 边框盒包裹内容和内边距。大小通过 border 相关属性设置。
- Margin box: 这是最外面的区域，是盒子和其他元素之间的空白区域。大小通过 margin 相关属性设置。

> 标准盒模型:


```css
.box {
  width: 350px;
  height: 150px;
  padding: 35px;
  margin: 35px;
  border: 5px;
}
```

标准盒子的宽度为 350+35+35+5+5 = 430px width + padding _ 2 + border _ 2

> 替代(IE)盒模型


使用这个模型，所有宽度都是可见宽度，所以内容宽度是该宽度减去边框和填充部分。使用上面相同的样式得到 (width = 350px, height = 150px)

.box {
box-sizing: border-box;
}

外边距
外边距是盒子周围一圈看不到的空间。它会把其他元素从盒子旁边推开。外边距属性值可以为正也可以为负。设置负值会导致和其他内容重叠。无论使用标准模型还是替代模型，外边距总是在计算可见部分后额外添加。

外边距的折叠
如果你有两个外边距相接的元素，这些外边距将合并为一个外边距，即最大的单个外边距的大小。

```html
<style>
  .box1 {
    width: 50px;
    height: 50px;
    margin-bottom: 50px;
  }
  .box2 {
    width: 50px;
    height: 50px;
    margin-top: 30px;
  }
</style>

<div class="box1"></div>
<div class="box2"></div>
```

这里的两个元素之间只有 50px 的距离

> 注意有设定 float 和 position=absolute 的元素不会产生外边距重叠行为,形成了BFC


边框
边框是在边距和填充框之间绘制的。如果您正在使用标准的盒模型，边框的大小将添加到框的宽度和高度。如果您使用的是替代盒模型，那么边框的大小会使内容框更小，因为它会占用一些可用的宽度和高度。

为边框设置样式时，有大量的属性可以使用——有四个边框，每个边框都有样式、宽度和颜色，我们可能需要对它们进行操作。

内边距
内边距位于边框和内容区域之间。与外边距不同，您不能有负数量的内边距，所以值必须是 0 或正的值。应用于元素的任何背景都将显示在内边距后面，内边距通常用于将内容推离边框。

圆角
通过使用 border-radius 属性和与方框的每个角相关的长边来实现方框的圆角。可以使用两个长度或百分比作为值，第一个值定义水平半径，第二个值定义垂直半径。在很多情况下，您将只传递一个值，这两个值都将使用。

- **盒子模型和内联盒子**
以上所有的方法都完全适用于块级盒子。有些属性也可以应用于内联盒子，例如由元素创建的那些内联盒子。

在下面的示例中，我们在一个段落中使用了，并对其应用了宽度、高度、边距、边框和内边距。可以看到，宽度和高度被忽略了。外边距、内边距和边框是生效的，但它们不会改变其他内容与内联盒子的关系，因此内边距和边框会与段落中的其他单词重叠

_使用 display: inline-block_
display 有一个特殊的值，它在内联和块之间提供了一个中间状态。这对于以下情况非常有用：您不希望一个项切换到新行，但希望它可以设定宽度和高度，并避免上面看到的重叠。

一个元素使用 display: inline-block，实现我们需要的块级的部分效果：

设置 width 和 height 属性会生效。
padding, margin, 以及 border 会推开其他元素。
但是，它不会跳转到新行，如果显式添加 width 和 height 属性，它只会变得比其内容更大。

- 溢出
overflow:hidden
overflow:visible
overflow:auto
overflow:scroll

## line-height的继承问题
```css
  <style>
    body{
      font-size: 20px;
      /* line-height: 16px; */
      /* line-height: 1.5; */
      line-height: 200%;
    }
    p{
      /* 1.line-height默认为16px */
      font-size: 16px;
      /* 使用 line-height: 16px这种方式来设置行高，不会发生继承font-size*/
      /* 2.  16px * 1.5 = 24px  */
      /* 使用line-height: 200% 这种方式来设置行高，会发生继承，从父级元素 * font-size 等于20 * 200% = 40px */
      /* 3. 20 * 200% = 40px */

    }
  </style>
</head>
<body>
  <p>一段文字</p>
</body>
```

- 使用 line-height: 1.5 这种方式来设置行高，不会发生继承父级的font-size,使用自身的font-size * 1.5
- 使用line-height: 200% 这种方式来设置行高，会发生继承，从父级元素 * font-size 等于20 * 200% = 40px
## 定位的取值
position 属性的取值

1.  static
这个关键值表示布局使用正常的布局行为，即元素在文档常规流中当前的布局位置。
此时的 top, right, bottom, left, 和 z-index 无效
2.  relative
该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置(相对于自身)
（因此会在此元素未添加定位时所在位置留下空白）
3.  absolute
元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，
来确定元素位置。绝对定位的元素可以设置外边距（margin），且不会与其他边距合并。

4. fixed
元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。
元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。
当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。

5. sticky
元素根据正常文档流进行定位，然后相对它的_最近滚动祖先（nearest scrolling ancestor）_和 containing block (最近块级祖先 nearest block-level ancestor)，包括 table-related 元素，基于top, right, bottom, 和 left的值进行偏移。偏移值不会影响任何其他元素的位置。 该值总是创建一个新的层叠上下文（stacking context）。
> 注意，一个 sticky 元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的overflow 是 hidden, scroll, auto, 或 overlay时），即便这个祖先不是最近的真实可滚动祖先


