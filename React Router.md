# React Router 

## 站点

无论是Vue，还是React，开发的单页面应用程序，可能只是该站点的一部分

一个单页应用里，可能会划分划分为多个页面（组件）

如果要在单页应用中完成组件的切换，需要实现下面两个功能：

1. 根据不同的页面地址，展示不同的组件（核心）
2. 完成无刷新的地址切换

我们把实现了以上两个功能的插件，称之为路由

## 两个代码库

1. react-router: 路由核心库，包含诸多和路由功能相关的核心代码
2. react-router-dom： 利用路由核心库，结合实际页面，实现跟页面路由密切相关的功能

如果是在页面中实现路由，需要安装react-router-dom

## 两种模式

url地址组成：

例： https://www.react.com:443/news/1-2-1.html?a=1&b=2#sdsd

1. 协议名（schema）： https
2. 主机名（host）：www.react.com
   1. ip地址
   2. 预设值： localhost
   3. 域名
   4. 局域网中电脑名称
3. 端口号（port）：443
   1. 如果协议是http，端口号是80，则可以省略端口号
   2. 如果协议是https，端口是443，则可以省略
4. 路径（path）： /news/1-2-1.html
5. search参数（search,query）: ?a=1&b=2
   1. 附带的数据
   2. 格式： 属性名=属性值&属性名=属性值。。。
6. 哈希（hash、锚点）：
   1. 附带的数据

window.location属性中，包含url的所有组成信息

### Hash Router 哈希路由

- 根据url地址中的哈希值来确定显示的组件

> 原因： hash的变化，不会导致页面刷新
>
> 这种模式的兼容性最好

### Broswer History Router 浏览器历史记录路由

HTML5出现后，新增了History Api，从此以后浏览器拥有了改变路径而不刷新页面的方式

History表示浏览器的历史记录，它使用栈的方式存储

1. history.length: 获取栈中数据量
2. history.pushState: 向当前历史记录栈中添加一条记录
   1. 参数1： 附加的数据，自定义数据，可以是任意类型
   2. 参数2：页面标题，目前大部分浏览器不支持，可以写null
   3. 参数3： 新的地址
3. history.replaceState: 将当前指针指向的历史记录，替换为某个记录
   1. 参数1： 附加的数据，自定义数据，可以是任意类型
   2. 参数2：页面标题，目前大部分浏览器不支持，可以写null
   3. 参数3： 新的地址

- 根据页面的路径决定渲染哪个组件

## 路由组件

React-Router 为我们提供了两个重要的组件

### Router组件

它本身不做任何展示，仅提供路由模式配置，另外，该组件会产生一个上下文，上下文会提供一些实用的对象和方法，共其他相关组件使用

1. HashRouter: 该组件，使用hash模式匹配
2. BrowserRouter：该组件，使用browserHistory模式匹配

通常情况下，Router组件只有一个，该组件包裹整个页面

### Route组件

根据不同的地址展示不同的组件

重要属性：

1. path：匹配的路径
   1. 默认情况下，不区分大小写，可以设置sensitive为tru来区分大小写
   2. 默认情况下，只匹配初始目录，如果要精确匹配，配置exact属性为true
   3. 如果不写path，则会匹配任意路径
   4. 跟组件嵌套没有关系，匹配的都是完整路径
2. component：匹配成功后要显示的组件
3. children: 
   1. 传递React元素，无论是否匹配，一定会显示children，并且会忽略component属性
   2. 传递一个函数，该函数有多个参数，这些参数来自于上下文，该函数返回react元素，则一定会显示返回的元素，并且忽略component属性

Route组件可以写到任意的地方，只要保证它是Router组件的后代元素

### Switch组件

写到Switch组件中Route组件，当匹配到第一个Route后，会立即停止

由于switch组件会循环所有子元素，然后让每个子元素去完成匹配，若匹配到，则渲染对应的组件，然后停止匹配，因此，不能在switch的子元素中使用除Route外的其他组件



## 路由信息

Router组件会创建一个上下文，并且向上下文注入一些信息

该上下文对开发者是隐藏的，Route组件若匹配到了地址，则会将这些上下文中的信息作为属性传入对应的组件

### history

它并不是window.history对象，我们利用该对象无刷新跳转地址

**为什么没有直接使用history对象**

1. React-Router中有两种模式： hash、hisroty，如果直接使用window.history，只能支持一种模式
2. 当使用window.history.pushState方法时，没有办法收到任何通知，将导致react无法知晓地址发生 了改变，结果导致无法重新渲染组件

- push： 将某个新的地址入栈（历史记录栈）
  1. 参数1：新的地址
  2. 参数2： 可选，附带的状态数据
- replace：将某个新的地址替换当前栈中的地址
- go：与window.history完全一致
- forward：与window.history完全一致
- back：与window.history完全一致

### location

与history.location完全一致，是同一个对象但是，与window.location不同

location对象中记录了当前地址的相关信息

我们通常使用第三方库：query-string，用于解析地址栏中的数据

### match

该对象中保存了路由匹配的信息

- isExact：事实上，当前的路径和路由配置的路径是否是精确匹配的

- params：获取路径规则中对应的数据

  ```react
  import React from 'react'
  import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
  // /a
  function A(props){
    return <div>
      <p>新闻：</p>
    </div>
  }
  
  export default function App(){
    return (
      <Router>
        <Switch>
          <Route path="/news/:year/:month/:day" component={A}/>
        </Switch>
      </Router>
    )
  }
  
  1.路径： /news/2019/8/6
  2.格式是多变的，不一定是斜杠： /news-2019-8-6 <=> path="/news-:year-:month-:day"
  3.可传可不传，字段后面添加问号： path="/news/:year?/:month?/:day?" 
  4.对字段进行约束，正则表达式： path="/news/:year(\d+)/:month(\d+)/:day(\d+)" 
  5.后面还有任意字符： path="/news/:year(\d+)/:month(\d+)/:day(\d+)/*"  后面得添加字符，否则组件无法渲染，因为路径不匹配
      
  ```

- path：Route的path属性

- url：页面路径

实际上，在书写Route组件的path属性时，可以书写一个string pattern(字符串正则)

react-router使用了第三方库：Path-to-RegExp，该库的作用是将一个字符串正则转换成一个真正的正则表达式

**向某个页面传递数据的方式：**

1. 利用state： 在push页面时，加入state
2. **利用search：把数据填写到地址栏中的？后**
3. 利用hash：把数据填写到hash后
4. **利用params：把数据填写到路径中**

### 非路由组件获取路由信息

某些组件，并没有直接放到Route中，而是嵌套在其他普通组件中，因此，它的props没有路由信息，如果这些组件需要获取路由信息，可以使用下面两种方式：

1. 将路由信息从父组件一层一层传递到子组件
2. 使用react-router提供的高阶组件withRouter，包装要使用的组件，该高阶组件会返回新组件，新组件将向提供的组件注入路由信息