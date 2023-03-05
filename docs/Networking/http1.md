# HTTP 基本知识

## 概念：

HTTP 超文本传输协议 是一个 用于传输超媒体(html pdf)的应用层协议,它是为 web 浏览器和 web 服务器 之间的通信
服务。HTTP 遵循经典的[客户端 - 服务端模型](https://en.wikipedia.org/wiki/Client–server_model)，客户端打开一个连接以发出请求，然后等待直到收到服务器端响应。HTTP 是[无状态协议](http://en.wikipedia.org/wiki/Stateless_protocol)，这意味着服务器不会在两个请求之间保留任何数据（状态）。尽管通常基于 TCP/IP 层，但它可以在任何可靠的[传输层](https://zh.wikipedia.org/wiki/传输层)上使用，也就是说，该协议不会像 UDP 那样静默的丢失消息。

HTTP 被设计于 20 世纪 90 年代初期，是一种可扩展的协议。它是应用层的协议，通过 [TCP](https://developer.mozilla.org/zh-CN/docs/Glossary/TCP)，或者是 [TLS](https://developer.mozilla.org/zh-CN/docs/Glossary/TLS)——加密的 TCP 连接来发送，理论上任何可靠的传输协议都可以使用。因为其良好的扩展性，时至今日，它不仅被用来传输超文本文档，还用来传输图片、视频或者向服务器发送如 HTML 表单这样的信息。HTTP 还可以根据网页需求，仅获取部分 Web 文档内容更新网页。

## HTTP 组成系统

每一个发送到服务器的请求，都会被服务器处理并返回一个消息，也就是*response*。在这个请求与响应之间，还有许许多多的被称为[代理](https://developer.mozilla.org/zh-CN/docs/Glossary/Proxy_server)的实体，他们的作用与表现各不相同，比如有些是网关，还有些是 [cache](https://developer.mozilla.org/zh-CN/docs/Glossary/Cache) 等。

![img](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview/client-server-chain.png)

实际上，在一个浏览器和处理请求的服务器之间，还有路由器、调制解调器等许多计算机。由于 Web 的层次设计，那些在网络层和传输层的细节都被隐藏起来了。HTTP 位于最上层的应用层。虽然底层对于分析网络问题非常重要，但是大多都跟对 HTTP 的描述不相干

**客户端(浏览器) 服务端 代理服务器**

**代理服务器**

在浏览器和服务器之间，有许多计算机和其他设备转发了 HTTP 消息。由于 Web 栈层次结构的原因，它们大多都出现在传输层、网络层和物理层上，对于 HTTP 应用层而言就是透明的，虽然它们可能会对应用层性能有重要影响。还有一部分是表现在应用层上的，被称为**代理**（Proxy）。代理既可以表现得透明，又可以不透明（“改变请求”会通过它们）。代理主要有如下几种作用：

- 缓存（可以是公开的也可以是私有的，像浏览器的缓存）
- 过滤（像反病毒扫描，家长控制...）
- 负载均衡（让多个服务器服务不同的请求）
- 认证（对不同资源进行权限管理）
- 日志记录（允许存储历史信息）

## HTTP 特性
1. **简单**

HTTP 报文的内容都是可见的，还允许测试。

2. **可拓展**

  在 HTTP/1.0 中出现的 [HTTP 标头（header）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)让协议扩展变得非常容易。只要服务端和客户端就新标头达成语义一致，新功能就可以被轻松加入进来。

3.**无状态**

  每一次请求都是独立，不具备保存上一次的内容这一次请求无法获取到。
  就比如说 在购物车页面添加了一件商品，第二次请求时商品不会存在购物车，可以使用 cookie 创建有状态的会话。

4. **可靠传输**

HTTP 底层是基于 TCP/IP 的可靠传输协议，在客户端（通常指浏览器）与服务器能够交互(客户端发起请求，服务器返回响应)之前，必须在这两者间建立一个 TCP 链接，打开一个 TCP 连接需要多次往返交换消息(因此耗时)。HTTP/1.0 默认为每一对 HTTP 请求/响应都打开一个单独的 TCP 连接。

5. **持久连接**

HTTP 1.1 为了减轻这些缺陷，HTTP/1.1 引入了流水线（被证明难以实现）和持久连接的概念：底层的 TCP 连接可以通过 [`Connection`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Connection) 标头来被部分控制。HTTP/2 则发展得更远，通过在一个连接复用消息的方式来让这个连接始终保持为暖连接。

## HTTP 的缺点

明文传输
无状态
队头阻塞

## HTTP 报文

HTTP/1.1 以及更早的 HTTP 协议报文都是语义可读的。在 HTTP/2 中，这些报文被嵌入到了一个新的二进制结构，帧。帧允许实现很多优化，比如报文标头的压缩以及多路复用。即使只有原始 HTTP 报文的一部分以 HTTP/2 发送出来，每条报文的语义依旧不变，客户端会重组原始 HTTP/1.1 请求。因此用 HTTP/1.1 格式来理解 HTTP/2 报文仍旧有效。

**通用的报文格式:**

1. 一行用于描述执行的请求, 或者对应的状态,成功或者失败,并且这个起始行都是单行的.
2. 一个可选的 HTTP 标头集合指明请求或描述消息主体
3. 一条空行表示请求的元数据已发送完毕
4. 一个可选的包含请求相关数据的主体(HTTP表单内容),或者响应的文档

**起始行和HTTP标头表示请求头, 而负载表示消息主体**

有两种 HTTP 报文的类型，请求与响应，每种都有其特定的格式。

### HTTP 请求报文
请求报文主要由三部分组成: 起始行, 标头, 请求体

![Requests and responses share a common structure in HTTP](https://cyzblog-1305365553.cos.ap-guangzhou.myqcloud.com/httpmsgstructure2.png)



#### 起始行

`POST /test.html?query=alibaba HTTP/1.1 HTTP/1.1 `

包括请求方法 请求目标 HTTP 版本号

请求方法如: `GET POST`

请求目标: 通常是一个 `URL`

#### 请求标头:

来自请求的 [HTTP 标头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)遵循和 HTTP 标头相同的基本结构：不区分大小写的字符串，紧跟着的冒号（`':'`）和一个结构取决于标头的值。整个标头（包括值）由一行组成，这一行可以相当长

#### 主体:

 一般从服务器获取资源的请求是不用 主体的,只有像 `POST PUT` 这种请求才需要请求体.

### 响应报文

状态行, 标头, 响应主体

#### 状态行

状态行包括了

1.  HTTP版本

2. 状态码(status code),

3. 描述状态码的消息(status text)

#### 标头

包括

1. 通用标头
2. 响应标头
3. 表示标头
4. ![Example of headers in an HTTP response](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages/http_response_headers3.png)

#### 响应主体

响应的最后一部分是主体。不是所有的响应都有主体：具有状态码（如 [`201`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/201) 或 [`204`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/204)）的响应，通常不会有主体。

## 状态码

**1xx 类属于提示信息，是协议处理中的一种中间状态。**

**2xx 表示请求成功**

200 OK http 请求成功拿到请求头 和body（除HEAD请求外）

201 Created 表示请求已经被成功处理，并且创建了新的资源 对应 `PUT请求 POST请求`

204 NO Content 请求成功拿到请求头

206 Partial Content 服务器处理成功 ，拿到请求体的一部分，一般是客户端发起的是（范围请求）或者文件的断点续传

**3xx 重定向相关**
300 Multiple Choices 是一个用来表示重定向的响应状态码，表示该请求拥有多种可能的响应

用户代理或者用户自身应该从中选择一个。由于没有如何进行选择的标准方法，这个状态码极少使用。

301  Moved Permanently 永久重定向，`说明请求的资源不存在 请求的URI 重定向到Location 头部指定的 URL `。

重定向请求通常（由于历史原因会把POST请求）使用GET方法，而不管请求用什么方法。

302 Found 临时重定向，请求资源还在，但需要使用另一个URL使用，重定向请求通常会使用GET方法，而不管请求用什么方法。

303 See Other 临时重定向，重定向请求必须使用GET方法。

304 Not Modified 不具有跳转的含义，表示资源未修改，重定向已缓存的文件， 缓存重定向。

307 Temporary Redirect 临时重定向，重定向请求必须使用与原请求相同的方法和包体发起请求。

308 Permanent Redirect（HTTP/1.1）永久重定向的请求必须使用与原请求相同的方法和包体发起请求。

**4xx 客户端的报文有误**

400 Bad Request 客户端请求的错误（一个笼统的错误，没有明确指明是什么错误）(报文错误, 无效的消息格式)

401 Unauthorized 代表客户端错误，指的是由于缺乏目标资源要求的身份验证凭证，发送的请求未得到满足。

403 Forbidden 代表客户端错误，指的是服务器端有能力处理该请求，但是拒绝授权访问。

404 Not Found 无法找到该内容，有可能客户端的URL错误

405 Method Not Allowed 表明服务器禁止了使用当前 HTTP 方法的请求


**5xx 服务器处理时内部发生了错误**

500 Internal Server Error 服务器错误是个笼统的错误

501 Not Implemented  服务器错误响应码表示请求的方法不被服务器支持

502 Bad Gateway 该扮演网关或代理角色的服务器从上游服务器中接收到的响应是无效的。注意，502 错误通常不是客户端能够修复的，而是需要由途经的服务器或者代理服务器对其进行修复

503 Service Unavailable 服务器繁忙

 **使用场景：**

- 服务器停机维护时，主动用503响应请求；
- nginx 设置限速，超过限速，会返回503。

## 常见的HTTP请求头和响应头

**1请求头**

- Accept:浏览器能够处理的内容类型
- Accept-Charset:浏览器能够显示的字符集
- Accept-Encoding:浏览器能够处理的压缩编码
- Accept-Language: 浏览器当前设置的语言
- Connection:浏览器与服务器之间的连接类型
- User-Agent:浏览器的用户代理字符串
- Host:发出请求的页面所在的域
- If-Match: 条件请求,服务器上的资源满足 该头部的值 ETag 才可以返回资源.
- If-Modified-Since: 携带服务器返回的 Last-Modified 进行协商缓存
- If-Not-Match: 当服务器上没有任何资源的 `ETag` 符合时才会返回资源 进行协商缓存
**2响应头**

- Date: 表示消息发送的时间。
- server: 服务器的name
- Connection:浏览器与服务器之间的连接类型
- Cache-Control: 控制浏览器缓存
- ETag: 表示唯一资源的字符串
- Last-Modifiled: 资源最后的修改时间
- Content-type:表示后面的文档属于什么类型
  - application/x-www-form-urlencoded:浏览器原生的表单，
  - multipart/form-data:该种方式是一个POST提交方式，在表单上提交文件时使用这种方式
  - application/json:服务器主体内容是JSON字符串
  - text/xml:用来提交 XML 格式的数据
  - 任意编码（仅在消息有主体时才存在）。



![Example of headers in an HTTP response](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages/http_response_headers3.png)

## 请求方法
常见的请求方法有 `GET POST PUT DELETE HEAD OPTIONS PATCH`
GET 获取服务器资源
POST 创建或者更新资源 不是幂等的
HEAD 获取报文的首部
PUT 创建或者更新资源
DELETE 删除资源
OPTIONS: 查询服务器端支持的 HTTP 方法种类


正确实现的 `GET HEAD OPTIONS` 是安全的
正确实现的 `GET HEAD PUT  OPTIONS DELETE` 是幂等的

方法的几个特性:
- 是否安全

如果说一个 HTTP 方法是安全的，是指这是个不会修改服务器的数据的方法。

- 是否幂等

一个 HTTP 方法是幂等的，指的是同样的请求被执行一次与连续执行多次的效果是一样的，服务器的状态也是一样的。换句话说就是，幂等方法不应该具有副作用（统计用途除外）

- 是否可缓存

GET 和 POST 请求的区别

1.从应用场景方面

GET 用于获取服务器资源, POST 用于向服务器上传请求资源创建新的数据.

2. 从安全的角度

GET 请求获取服务器资源是不安全的 传递的参数在 `url` 上可见.
POST 请求 相对来说安全的.

3. 从幂等的角度

GET 是幂等的
POST 不是幂等的 同样的请求执行多次效果不一样,服务器的状态也不一样.

4. 从缓存的角度

GET 请求是浏览器默认会缓存
POST 请求浏览器默认不会有缓存

5. 参数传递角度

GET 请求通过 URL 查询参数
POST 请求通过请求体






