# git 的使用

## 本地仓库初始化

初始化 Git仓库 `git init`  该命令会创建一个 .git的子目录 这个子目录里有各种初始化的文件。
被 `git`  管理的目录下的本地的文件分为三种状态

文件状态划分
- 未跟踪：默认情况下，Git仓库下的文件没有添加到git仓库管理中，需要通过add命令来操作
- 已跟踪：添加到Git仓库管理的文件已跟踪状态，Git可以对文件进行各种跟踪管理；
- 已跟踪的文件又可以进行状态的划分
  - staged: 暂存区的文件状态
  - Unmodified: 未修改的commit命令，可以将staged 中的文件提交到仓库中
  - Modified:修改了某个文件后，会处于Modified状态

staged 暂缓区 没有和 commit 对象联系到一起 也可以称为 index 区



![image-20230608184418379](https://cyzblog-1305365553.cos.ap-guangzhou.myqcloud.com/image-20230608184418379.png)


- 使用 `git add .` 将所有文件添加到暂存区（索引区）中
- 使用 `git status` 来查询文件的状态
  - `git status -s` 使用简短的格式输出文件状态信息

### 忽略文件
配置 .gitignore文件 来忽略一些不想要提交的文件。
这些文件通常是自动生成的文件，比如日志文件，本地环境变量的文件，编辑器自动生成的文件

```shell
node_modules
.temp
docs/.vitepress/cache
dist
.vscode
cache
.eslintcache
components.d.ts

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# json
meta.json
```

### git 校验和知识

校验和是 commit 提交的唯一ID 使用 hash 算法生成

![image-20230608185258562](https://cyzblog-1305365553.cos.ap-guangzhou.myqcloud.com/image-20230608185258562.png)





### 使用 `git log` 可以查看提交记录

输出提交的时间，作者 提交的校验和还有分支相关的内容。



![image-20230608185450897](https://cyzblog-1305365553.cos.ap-guangzhou.myqcloud.com/image-20230608185450897.png)



`git log --pretty=oneline` 可以美化输出的内容已一行的形式展现



### git 本地仓库版本回退

Git通过HEAD指针记录当前版本。

- HEAD 是当前分支引用的指针，它总是指向该分支的最后的一次提交；

  ![image-20230608185832725](https://cyzblog-1305365553.cos.ap-guangzhou.myqcloud.com/image-20230608185832725.png)

我们可以通过HEAD来改变Git目前的版本指向：

- 上一个版本就是HEAD^, 上上个版本就是HEAD^^;
- 如果上1000个版本，可以使用HEAD~1000;
- 最好的方式是指定一个commit id;

```shell
git reset --hard HEAD^
git reset --hard HEAD~1000
git reset --hard 9e8fc88
```


## 远程仓库管理

常见的远程仓库种类：
GitHub Gitee Gitlab
1.创建一个远程仓库
2.在本地clone下来代码 （私有仓库需要验证）

要操作私有仓库的内容，远程仓库会对身份进行验证

1. git 服务器验证手段包括
- 基于HTTP的凭证存储 （Credential Storage）
- 基于SSH的密钥

验证方法：

因为 HTTP 是无状态的连接所以，每一个连接都需要用户名和密码
但 Git 拥有一个凭证系统来处理这个事情

Git Crediential 的选项
- 默认都不缓存，每一次连接都会询问你的用户名和密码
- cache 模式会将凭证存放在内存中一段时间。15分钟后会被清除掉
- store 模式会将凭证用明文的方式存放在磁盘中，并且永不过期；
- 在 Windows 安装一个“Git Credential Manager for Windows”的辅助工具，第一次使用会有如下的提示框。之后便可以不用在输入了 ，并且是加密保存用户名和密码的。
使用 git config crendential.helper命令来判断是否安装了这个辅助工具

```shell
$ git config credential.helper
manager-core # 输出这个表示已安装
```


远程仓库的验证-SSH密钥

Secure Shell (安全外壳协议) 是一种加密的网络传输协议，可在不安全的网络中为网络服务提供安全的传输环境

SSH 以非对称加密实现身份验证
- 一种方法是使用自动生成的公钥-私钥对来简单的加密网络连接。之后使用密码认证进行登录
- 第二种方法是手动生成一对公钥和私钥，通过生成的密钥进行验证，这样就可以不用输入密码的情况下登录
- 第二种方法公钥需要放置待访问的电脑中，私钥需要由用户自行保存。
使用如下这个命令生成公钥-私钥对
`ssh-keygen -t ed25519 -C "1078377113@qq.com"`
ed25519 是加密的类型

在对应的位置找到公钥放入仓库的公钥中。就可以clone 私人仓库了

#### 添加远程仓库

`git remote add origin git@gitee.com:caifah/git-study.git`

origin 远程仓库的名字 git@... 远程仓库的地址

`git remote [-v]` 参数表示查看详细版本

使用此命令可以查看本地仓库中的存放远程仓库

#### 与远程仓库的交互
1. 添加远程仓库
`git remote add origin git@gitee.com:caifah/git-study.git`

2. 从远程仓库克隆代码，将存储到新的仓库
`git clone origin`

3. 将本地代码 push 到远程仓库，
`git push`
`git push origin master`

4. 从远程仓库获取代码
默认情况是从origin中获取代码
`git fetch`
`git fetch origin matser`

5. 获取到的代码默认没有合并到本地仓库,通过 git merge 合并

远程分支的命名方式 remote/本地分支
`git merge`
`git merge origin/master`

6. 从远程仓库pull代码：做了 fetch + merage
git pull

这里只是简单的梳理一下流程详细的分支管理还需要看下一篇文章分支管理

### git Tag

Git Tag
在重大的版本，我们可以打上一个标签，以表示它的重要性
- Git 可以给仓库历史中的一个提交打上标签
- 使用这个功能来标记发布节点 （v1.0, v2.0）;
1. 创建标签：
  - git 支持两种标签： 轻量标签 与 附注标签 （annotated）
  - 附注标签： 通过-a选项，并且通过-m添加额外信息
  `git tag v1.0`
  `git tag -a v1.1 -m '附注标签'`

  在默认情况下， git push 命令并不会传送标签到远程服务器上。
  - 在创建标签后必须要显示的提交标签到共享服务器上，当其他人从仓库中克隆或拉取，他们也能看到你的那些标签。
  `git push origin v1.0`
  `git push origin --tags`

2. 删除标签
删除本地的标签，可以使用 `git tag -d <tagname>`
`git tag -d v1.1`
删除远程tag:
要删除远程的tag 可以通过  `git push <remote> -delete <tagname>`

分支回退到打了标签的版本
`git checkout  v1.0.0`