# Redux

React               ui解决方案

React-Router   解决路由

Redux               数据的解决方案

Antd				  UI库

## Redux核心概念

action、reducer、 store

### MVC

它是一个UI解决方案，用于降低UI以及UI关联的数据的复杂度

**传统的服务器的MCV**

环境：

1. 服务端需要相应一个完整的HTML
2. 该HTML中包含页面需要的数据
3. 浏览器仅承担渲染页面的作用

以上的这种方式叫做**服务端渲染**，即服务端将完整的页面组装好之后，一起发送给客户端

服务器端需要处理UI要用到的数据，并且要将数据嵌入到页面中，最终生成一个完成的HTML页面响应。

为了降低处理这个过程的复杂度，出现了MVC模式。

**Controller**: 处理请求，组装这次请求需要的数据

**Model**：需要用于UI渲染的数据模型

**view**：视图，用于将模型组装到界面中



**前端MVC模式的困难**

React解决了    数据 =>视图     的问题

1. 前端的controller要比服务器复杂很多，因为前端中的controller处理的是用户的操作，而用户的操作场景是复杂的。
2. 对于那些组件化的框架（比如Vue、react），它们使用的是单项数据流。若需要共享数据，则必须要将数据提升到顶层组件，然后数据再一层一层传递，极其繁琐。虽然可以使用上下文来提供共享数据，但对数据的操作难以监控，容易导致调试错误的困难，以及数据还原的困难，并且，若开发一个大中型项目，共享的数据很多，会导致上下文中的数据变得非常复杂。



**前端需要一个独立的数据解决方案**

### Flux

Facebook提出的数据解决方案，它的最大历史意义，在于它引入了action的概念

action是一个普通的对象，用于描述要干什么，action是触发数据变化的唯一原因

store表示数据仓库，用于存储共享数据，还可以根据不同的action更改仓库中的数据

示例：

```js
var action = {
    type: 'login',
    payload: {
        loginId: 'admin'
    }
}
```



### Redux

再Flux基础上，引入了reducer的概念

reducer： 处理器，用于根据action来处理数据，处理后的数据会被仓库重新保存

## action

- action是一个plain-object（平面对象）
  1. 它的____proto____指向的是object.prototype
- 通常使用payload属性表示附加数据（没有强制要求）
- action中必须有type属性，该属性用于描述操作的类型
  1. 但是没有对type的类型做出要求
- 在大型项目，由于操作类型非常多，为了避免硬编码（hard code），会将action的类型存放到一个或一些单独的文件中（样板代码）
- 为了方便传递action，通常会使用action创建函数（action creater）来创建action
  1. action创建函数应为无副作用的纯函数
     1. 不能以任何形式改动参数
     2. 不可以有异步
     3. 不可以对外部环境中数据造成影响
- 为了方便利用action创建函数来分发（触发）action，redux提供了一个函数```bindActionCreator```，该函数用于增强action创建函数的功能，使它不仅可以创建action，并且创建后可以自动分发

```js
// 第一个参数，是action创建函数合并的对象，第二个参数是仓库的dispatch函数
// 得到一个新的对象，新对象中的属性与第一个参数的属性名一致
const boundActions = bindActionCreators(numberAction,store.dispatch)
// 得到一个increase action,并直接分发
boundActions.getIncreaseAction()
```

<img src=".\bindAction.png" alt="bindAction"  />

## reducer

Reducer是用于改变数据的函数

- 一个数据仓库，有且仅有一个reducer，并且通常情况下，一个工程只有一个仓库，因此一个系统只有一个reducer

- 为了方便管理，通常会将reducer放到单独的文件中

- reducer被调用的时机：

  - 通过store.dispatch，分发了一个action，此时，会调用reducer

  - 当创建一个store的时候，会调用一次reducer

    - 可以利用这一点，用reducer进行初始化状态

    - 创建仓库时，不传递任何默认状态

    - 将reducer的参数state设置一个默认值

      ```js
      const store = createStore(reducer) 
      
      export default function reducer(state = 10, action){
        console.log('reducer运行了', state, action)
        // 返回一个新的状态
        if(action.type === actionTypes.Increase){
            return state + 1;
        }else if(action.type === actionTypes.Decrease){
            return state - 1;
        }else if(action.type === actionTypes.SET){
            return action.payload
        }
        
        return state ;
        
      }
      ```

- reducer内部通常使用switch来判断type值

  ```js
    switch (action.type) {
      case actionTypes.Increase:
        return state + 1;
      case actionTypes.Decrease:
        return state - 1;
      case actionTypes.SET:
        return action.payload;
      default:
        return state ;
    }
  ```

- **reducer必须是一个没有副作用的纯函数**

  1. 为什么需要纯函数？
     1. 纯函数有利于测试和调试
     2. 有利于还原数据
     3. 有利于将来和react结合时的优化
  2. 具体要求
     1. 不能改变参数，因此若要让状态变化，必须得到一个新的状态
     2. 不能有异步
     3. 不能对外部环境造成影响（例如：cookie、localStorage）

- 由于在大中型项目中，操作比较复杂，数据结构也比较复杂，因此，需要对reducer进行细分



