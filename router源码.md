# router源码



## 创建match对象

**path-to-regexp** ：用于将一个字符串正则（路径正则、path regexp）

## history对象

该对象提供了一些方法，用于控制或监听地址的变化。

该对象不是window.history， 而是一个抽离的对象，它提供了统一的API接口，封装了具体的实现

- createBrowserHistory 产生的是控制浏览器真实地址的history对象
- createHashHistory 产生的是控制浏览器hash的history对象
- createMemoryHistory 产生的是控制内存中地址数组的history对象

history对象共同的特点： 维护了一个地址栈

第三方库： history

**以下三个函数，虽然名称和参数不同，但返回的对象结构（history）完全一致**

**history对象：**

- action:  当前地址栈，最后一次操作的类型
  1. 如果是createXXXXHistory函数新创建的history对象，action固定为POP
  2. 如果调用了history的push方法：action变为PUSH
  3. 如果调用了history的replace方法，action变为REPLACE
- push: 向当前地址栈指针位置，入栈一个地址
- replace: 替换指针指向的地址
- go：控制当前地址栈指针偏移，如果是0，则地址不变，如果是负数，则后退指定的步数，如果是正数，则前进指定的步数
- goBack：相当于go(-1)
- goForward: 相当于go(1)
- length：当前栈中的地址数量
- location: 当前地址的信息
- listen：函数，用于监听地址栈指针的变化
  1. 该函数接收一个函数作为参数，该参数辨识地址变化后要做的事情，该参数函数接收两个参数：
     1. location：记录了新的地址
     2. action：进入新地址的方式，有三种方式：？？？？？？跟history版本不同，有所变化
        1. POP：指针移动，调用go、goBack、goForward，用户点击浏览器前进后退按钮
        2. PUSH:  调用history.push
        3. REPLACE: 调用history.replace
  2. 该函数有一个返回值，返回的是一个函数，用于取消监听
- block：函数，用于设置一个阻塞，当页面发生跳转时，会将指定的消息传到getUserConfirmation，并调用getUserConfirmation函数

### createBrowserHistory 

创建了一个使用浏览器History Api的history对象

配置对象：

- basename:  设置根路径
- forceRefresh： 地址改变时是否强制刷新页面
- keyLength:  location对象使用的key值长度
  - 地址栈中记录的并非是字符串，而是一个location对象，通过key值区分不同的location对象
- getUserConfirmation：一个函数，该函数当调用history对象的block函数后，发生页面跳转时运行

go:  导致刷新页面

### createHashHistory 

创建了一个使用浏览器hash的history对象

### createMemoryHistory 

创建了一个使用内存中的地址栈的history对象