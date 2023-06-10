# git 分支管理

git 的分支本质上就是一个指向提交对象的可变指针

git master 或者新增的 main 分支其实就是 git init 时创建的本地分支和普通分支没有区别

## git 本地分支

### 创建分支
本地创建分支的命令
`git branch dev`

在本地仓库创建了一个 dev 分支

切换分支使用 `git checkout dev`
git 如何知道当前是在哪一个分支上，通过 HEAD 指针,头指针指向当前所在的分支上。


![image-20230609144253705](https://cyzblog-1305365553.cos.ap-guangzhou.myqcloud.com/image-20230609144253705.png)

`git checkout -b dev` 可以创建分支并移动到该分支上

#### 本地分支提交
使用 `git commit -m '提交附注信息'` 来将暂存区中的代码提交
当前所在分支为 dev, dev 分支新提交了一次那么整个提交和分支之间的关系如下图


![image-20230609150103739](https://cyzblog-1305365553.cos.ap-guangzhou.myqcloud.com/image-20230609150103739.png)


![image-20230609150913479](https://cyzblog-1305365553.cos.ap-guangzhou.myqcloud.com/image-20230609150913479.png)

#### 查看和删除分支
`git branch` 查看当前所在分支
`git branch -v` 同时查看最后一次提交

`git branch --merged` 查看所有合并到当前分支的分支
`git branch --no-merged` 查看没有合并到当前分支的分支

`git branch -d hotfix` 删除分支
`git branch -D hotfix` 强制删除分支

## git 远程分支

远程分支是一种分支结构
以 <remote>/<branch> 的形式命名

从本地 clone 下来代码 分支如下

![image-20230610093106211](https://cyzblog-1305365553.cos.ap-guangzhou.myqcloud.com/image-20230610093106211.png)

当你的同事写了最新的代码并提交到远程，你自己页在本地的分支写一些代码，此时分支结构如下


![image-20230610093545010](https://cyzblog-1305365553.cos.ap-guangzhou.myqcloud.com/image-20230610093545010.png)

这个时候你要提交代码到远程分支上需要先获取最新的代码在合并在提交。

`git pull origin main`

这个命令自动去远程的 main 分支拉取最新的代码，并自动和当前分支合并代码。

### 远程分支的管理
- 推送分支到远程，前提是这个仓库具备写入权限

`git push origin dev`
需要你设置上游分支
`git branch --set-upstream-to=origin/dev`

- 跟踪远程分支
当克隆一个仓库时，git 会自动的创建一个 跟踪分支 origin/main 的 main 分支

想要设置其他的跟踪分支， 可以使用这个指令
`git checkout --track <remote>/<branch>`

- 删除远程分支
如果一个远程分支不在使用,想要删除掉,可以运行 --delete 选项的 `git push --delete dev` 来删除远程分支

使用场景

本地没有 dev 分支, 想在本地创建一个 dev 分支并且跟踪远程 origin/dev 分支可以使用

`git checkout --track origin dev` 切换分支并自动跟踪这个分支


## git 分支的合并处理
分支合并

在默认情况下一个 git 仓库有多个分支，不同的同事使用不同的分支，最后统一合并到主分支上。

A 和 B 在 fetch 了一份最新的代码下来本地开发

A 同事写完代码后提交到远程分支上，
B 同事写完后本地分支和远程分支上的提交内容不同此时如果直接提交会发生冲突。

B 同事需要 fetch 最新的代码然后合并代码后在提交到远程仓库。

如果 在fetch 最新代码下来后，合并代码的过程中本地分支的代码和运程分支的代码发生了冲突，这个时候需要手动修改冲突
合并后会产生一个最新的提交


git merge / git rebase 的区别

