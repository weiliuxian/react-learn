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
4. render: 函数，返回可渲染的东西，有个一个参数，该参数可以获取路由上下文信息
5. children和render的区别：
   1. render是匹配后才会运行
   2. children是无论是否匹配都会运行

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
2. 当使用window.history.pushState方法时，没有办法收到任何通知，将导致react无法知晓地址发生了改变，结果导致无法重新渲染组件

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



## 其他组件

已学习：

- Router： BrowserRouter、HashRouter
- Route
- Switch
- 高阶函数：withRouter

### Link

生成一个无刷新跳转的a元素

- to
  1. 字符串： 跳转的目标地址
  2. 对象： 
     - pathname：url路径
     - search
     - hash
     - state：附加的状态信息
- replace：bool，表示是否替换当前的地址，默认是false
- innerRef：可以将内部的a元素的ref附着在传递的对象或函数参数上
  1. 函数
  2. 对象

### NavLink

是一种特殊的Link，具备的额外的功能：根据当前地址和a标签链接地址，来决定该链接的样式

- activeClassName： 匹配时使用的类名
- activeStyle： 匹配时使用的内联样式
- exact： 是否精确匹配
- sensitive：匹配时是否区分大小写
- strict：是否严格匹配最后一个斜杠

### Redirect

重定向组件，当加载到该组件时，会自动无刷新地跳转到另外一个地址

- to：跳转的目标地址，同Link的to
- push： 默认为false，表示跳转使用替换的方式，设置为true后，则使用push的方式跳转
- from： 当匹配到from地址规则时才进行跳转
- exact： 是否精确匹配from
- sensitive：匹配时from是否区分大小写
- strict：from是否严格匹配最后一个斜杠



## 嵌套路由

都是由自定义方法实现的，没有什么固定的模式

1. 方式一：使用macth获取匹配信息

```react
function User({match}){
  const pPath = match.url
  return <div>
    <h1>User固定区域</h1>
    <p>
    <Link to={`${pPath}/update`}>用户信息</Link>
    <Link to={`${pPath}/pay`}>充值</Link>
    </p>
    <div style={{
      width:500,
      height:500,
      border: '2px solid',
      margin: 'o auto'
    }}>
      <Route path={`${pPath}/update`} component={UserUpdate} />
      <Route path={`${pPath}/pay`} component={UserPay} />
    </div>
  </div>
}
```

2. 自定义js文件

   ```js
   const config = {
     user: {
       root: '/user',
       update: '/update',
       pay: {
         root: '/pay',
         afterPay: '/before',
         before: '/after'
       },
     }
   }
   function setConfig(obj,baseStr){
     _setConfig(obj,baseStr)
   }
   /**
    * 将该对象的每一个字符串属性，前面添加baseStr
    * 如果属性名为root，则直接添加baseStr
    * 如果属性名不是root，则添加baseStr再拼接root属性值
    * 如果属性不是字符串，递归调用该方法
    * @param {*} obj 
    * @param {*} baseStr 
    */
   function _setConfig(obj,baseStr){
     const newBaseUrl = baseStr + (obj.root === undefined ? '' : obj.root)
     for (const prop in obj) {
       if (Object.hasOwnProperty.call(obj, prop)) {
         const value = obj[prop];
         if(typeof value === 'string'){
           if(prop === 'root'){
             obj[prop] = baseStr + value
           }else {
             obj[prop] = newBaseUrl + value
           }
         }else {
           _setConfig(obj[prop], newBaseUrl)
         }
         
       }
     }
   }
   setConfig(config,'')
   
   export default config
   ```

   处理完成结果如图：

![image-20210222134403579](C:\Users\86151\AppData\Roaming\Typora\typora-user-images\image-20210222134403579.png)

## 受保护的页面

自定义路由组件，众多方法之一

```react
import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import loginInfo from './loginInfo'
export default function ProtectedRoute({component:Component,children,render,...rest}) {
  return (
    <Route {...rest} render={values => {
      if(loginInfo.isLogin){
        return <Component />
      }
      else {
        // return <Redirect to={{
        //   pathname: '/login',
        //   search: '?returnurl=/personal'
        // }} />
        return <Redirect to={{
          pathname: '/login',
          state: values.location.pathname
        }} />
      }
    }} />
  )
}

使用
function Login(props){
  return <div>
   <button onClick={() => {
     loginInfo.login()
     if(props.location.state){
      props.history.push(props.location.state)
     }else {
        props.history.push('/')
      }
    // const query = qs.parse(props.location.search)
    // if(query.returnurl){
    //   props.history.push(query.returnurl)
    // }else {
    //   props.history.push('/')
    // }
   }}>登录</button>
  </div>
}

受保护页面
<ProtectedRoute path="/personal" component={Personnal}/>
    
```



## 路由导航守卫

导航守卫：当离开一个页面，进入另一个页面时，触发的事件

history对象：

- listen：监听地址的变化，当地址发生变化时，会调用传递的函数
  - 参数： 函数，函数参数有：
    - 参数1： location对象，记录当前的地址信息
    - 参数2：action，一个字符串，表示进入该地址的方式，取值有：
      1. POP： 通过点击浏览器后退和前进、调用history.go、调用history.goBack、调用history.goForward，出栈（即当前页面指针发生了在现有页面来回移动）
      2. PUSH： 点击无刷新的超链接、history.push，入栈（即添加了新页面，页面指针指向新的页面）
      3. REPLACE: 替换，调用history.replace
  - 函数运行时间点： 发生在即将跳转到新的页面时
  - 返回结果： 函数，可以调用该函数取消监听
- block：设置一个阻塞，并同时设置阻塞消息，当页面发生跳转时，会进入阻塞，并将阻塞消息传递到路由根组件Router的getUserConfirmation方法，如果设置阻塞时，getUserConfirmation没有做处理或者没有设置阻塞直接在getUserConfirmation方法写逻辑处理，无效，这两者是相互依赖的
  - 字符串
  - 函数： 函数返回结果时一个字符串，用于表示阻塞消息，也有两个参数：
    1. location
    2. action
  - 返回结果： 函数，用于取消阻塞器



路由根组件(Router)

- getUserConfirmation，有两个参数：
  - msg：阻塞消息
  - callback：回调函数，调用该函数并传递true，则表示进入到新页面，否则，不做任何操作

```react
import React, { Component } from 'react'
import { withRouter,BrowserRouter as Router} from 'react-router-dom'

let preLocation, location, action, unBlock;

class _GuardHelper extends Component {
    componentDidMount() {
        // 设置阻塞（只能设置一个）
        unBlock = this.props.history.block((newLocation, ac)=>{
            preLocation = this.props.location
            location = newLocation
            action = ac
            return ''
        })
        // 添加一个监听器
        this.unListen = this.props.history.listen((location,action) => {
            const prevLocation = this.props.location
            this.props.onChange && this.props.onChange(prevLocation, location, action, this.unListen)
        })
    }
    componentWillUnmount(){
        unBlock()
        this.unListen()
    }
    render() {
        return null
    }
}

const GuardHelper = withRouter(_GuardHelper)

class RouteGuard extends Component {
   handleConfirm = (msg, callback) => {
        if(this.props.onBeforeChange){
            this.props.onBeforeChange(preLocation, location, action, callback, unBlock)
        }else{
            callback(true)
        }
    }
    render() {
        return  <Router getUserConfirmation={this.handleConfirm}>
                    <GuardHelper onChange={this.props.onChange}/>
                    {this.props.children}
                </Router>
    }
}

export default RouteGuard

使用
export default function App(){
  return (
    <RouteGuard
      onBeforeChange={(preLocation, location, action, callback, unBlock) => {
        console.log(`页面想要从${preLocation.pathname}跳转到${location.pathname},允许跳转`)
        callback(true)
      }}
      onChange={(prevLocation,location,action,unListen) => {
        console.log(`日志：从${prevLocation.pathname}进入页面${location.pathname},进入方式${action}`)
      }}
    >
      <nav>
        <Link to='/page1'>页面1</Link>
        <Link to='/page2'>页面2</Link>
      </nav>
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
    </RouteGuard>
  )
}
```



## 常见应用 - 路由切换动画

第三方动画库： react-transition-group

```react
import React from 'react'
import {Route} from 'react-router-dom'
import 'animate.css'
import {CSSTransition} from 'react-transition-group'

export default function TransitionRoute(props) {
    const {component:Component,...rest} = props
    return (
        <Route {...rest}>
            {props => {
                return <CSSTransition
                  in={props.match?true:false}
                  timeout={2000}
                  classNames={{
                    enter: 'animate__animated animate__slow animate__fadeInRight',
                    // enterActive: 'animate__fadeIn',
                    exit: 'animate__animated animate__slow animate__fadeOutLeft',
                    // exitActive: 'animate__fadeOut'
                  }}
                  mountOnEnter={true}
                  unmountOnExit={true}
                >
                  <Component />
                </CSSTransition>
            }}
          </Route>
    )
}
```

## 常见应用 - 滚动条复位

常见方法：

1. 高阶组件

   ```react
   import React from 'react'
   
   export default function widthScrollTop(Comp) {
       return class ScrollTopWrapper extends React.Component {
           componentDidMount() {
               window.scrollTo(0,0)
           }
           render() {
               return <Comp {...this.props} />
           }
       }
   }
   ```

2. 使用useEffect

   ```react
   import {useEffect} from 'react'
   import reset from './restScroll'
   
   export default function useScroll(pathname) {
       useEffect(() => {
           reset()
       }, [pathname])
   }
   
   restScroll.js
   let timer1,timer2;
   /**
    * 滚动条横向和纵向动画复位
    */
   export default function resetScroll() {
       clearInterval(timer1)
       clearInterval(timer2)
       var html = document.documentElement
       timer1 = animate(html.scrollTop,0,(val) => {
           html.scrollTop = val
       })
       timer2 = animate(html.scrollLeft,0,(val) => {
           html.scrollLeft = val
       })
   }
   
   /**
    * 在300毫秒之内从指定的初始值变化到结束值
    * @param {*} start 
    * @param {*} end 
    */
   function animate(start,end,callback) {
       var tick = 16; // 每隔16毫秒完成一次变化
       var total = 300;//总时间为1000毫秒
       var times = Math.ceil(total / tick);//变化的次数
       var curTimes = 0;
       var dis = (end - start) / times; //每次运动的距离
   
       var timer = setInterval(()=>{
           curTimes++
           start += dis
           if(curTimes === times){
               start = end
               clearInterval(timer)
           }
           callback(start)
       },tick)
       return timer
   }
   ```

3. 使用自定义路由导航守卫： 主要是判断路径是否发生变化



## 常见应用 - 阻止跳转

添加阻塞，history.block，react已经提供该功能组件 Prompt