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



## Redux三大组成部分

### action

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

### reducer

Reducer是用于改变数据的函数

入参：state（当前状态）、action

返回值：新的状态（即调用对应的方法后返回的新的数据）



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

  1. redux提供了方法```combineReducers```，可以帮助我们更加方便的合并reducer
  2. combineReducers: 合并reducer，得到一个新的reducer，该新的reducer管理一个对象，该对象中的每一个属性交给对应的reducer管理

### store

store： 用于保存数据

通过createStore方法创建的对象

该对象的成员：

- dispatch：分发一个action

- getState：得到仓库中的当前状态

- replaceReducer：替换掉当前的reducer

- subscribe：注册一个监听器，监听器是一个无参函数，该分发一个action之后，会运行注册的监听器。该函数会返回一个函数，用于取消监听

  

## 实现createStore

入参： reducer、默认值（可选）

- 第二个参数如果是一个函数代表使用中间件，applyMiddleware(中间件)
- 第二个参数不是函数，代表默认值，那么第三个参数如果使用了applyMiddleware(中间件)，也代表使用中间件

返回值：一个对象

该对象的成员：

- dispatch：分发一个action

  ```
  入参： action
  验证是否是平面对象、是否有type属性
  调用当前的reducer函数，	更新当前状态
  运行所有的监听器
  ```

- getState：得到仓库中的当前状态

- subscribe：注册一个监听器，监听器是一个无参函数，该分发一个action之后，会运行注册的监听器。该函数会返回一个函数，用于取消监听

  

## 实现bindActionCreators

参数： actionCreators（action创建函数的函数/对象集合）、store的dispatch方法

1. 如果传递的是一个函数，返回值也是函数，该函数内部自动调用dispatch方法
2. 如果传递的是一个对象，返回的也是对象，该对象的属性名和传递的参数对象的属性名一致，属性值是一个调用了disptch方法的函数

返回值：函数/对象

功能： 创建action的同时，绑定dispatch方法，在调用action创建函数的时候自动完成分发

## 实现combineReducers

入参：reducers（reducer集合对象）

返回值：reducer函数

组装reducers，返回一个reducer，数据使用一个对象表示，对象的属性名和传递的参数对象保持一致

```

判断是否是一个对象，且是平面对象
循环运行每个reducer，判断reducer的返回结果是否不是undefined
返回一个reducer函数，该reducer函数内部循环调用入参的每个reducer，返回一个新的状态

```

## Redux中间件（Middleware）

中间件：类似于插件，可以在不影响原本功能、并且不改动原本代码的基础上，对其功能进行增强。在Redux中，中间件主要用于增强dispatch函数。

实现Redux中间件的基本原理，是更改仓库中的dispatch函数。

示例：

```react

// 输出之前的状态，输出新的状态，输出触发的action

const oldDispatch = store.dispatch;
store.dispatch = function(action){
    console.log('旧数据',store.getState())
    console.log('action',action)
    oldDispatch(action)
    console.log('新数据',store.getState())
    console.log('')
}

```

Redux中间件书写：

- 中间件本身是一个函数，该函数接收一个store参数，表示创建的仓库，该仓库并非一个完整的仓库对象，仅包含getState，dispatch，该函数运行的时间，是在仓库创建之后运行

  1. 由于创建仓库后需要自动运行设置的中间件函数，因此，需要在创建仓库时告诉仓库有哪些中间件，需要使用applyMiddleware函数，将函数的返回结果作为CreteStore的第二个参数或第三个参数

     ```js
     const store = createStore(reducer,applyMiddleware(loggerMiddleware)) 
     ```

- 中间件函数必须返回一个dispatch创建函数

  ```js
  
  function logger2(store){
      return function(next){
          // 下面的函数是最终要应用的dispatch
          return function (action){
              console.log('旧数据',store.getState())
              console.log('action',action)
              next(action)
              console.log('新数据',store.getState())
              console.log('')
          }
      }
  }
  
  简写模式
  const logger1 = store => next => action => {
      console.log('旧数据',store.getState())
      console.log('action',action)
      next(action)
      console.log('新数据',store.getState())
      console.log('')
  }
  
  ```

  ```react
  
  const store = createStore(reducer,applyMiddleware(logger1,logger2)) 
  过程：
  const dispatch1 = logger1(store)
  const dispatch2 = logger2(store)
  
  dispatch1(dispatch2)
  
  分别执行logger1、logger2，得到两个dispatch函数，dispacth1和dispatch2函数，
  然后把dispatch2函数作为参数传递给dispatch1，
  执行dispatch1函数，后面会依次执行传递的中间件
  
  ```

中间件的应用方式：

- 方式1

  ```js
  const store = createStore(reducer,applyMiddleware(loggerMiddleware) 
  ```

- 方式2

  ```js
  const store = applyMiddleware(logger1,logger2)(createStore)(reducer，默认值)
  ```

  applyMiddleware函数，用于记录有哪些中间件，它会返回一个函数

  - 该函数用于记录创建仓库的方法，传递createStore创建store， 然后又返回一个函数,
    - 该函数可以传递创建store时的参数



### 实现applyMiddleware

middleware的本质，是一个调用后可以得到dispatch创建函数的函数

compose：函数组合，将一个数组中的函数进行组合，形成一个新的函数，该函数调用时，实际上是反向调用之前组合的函数



## 中间件

### redux-logger

### 利用中间件处理副作用

#### redux-thunk

thunk允许action是一个带有副作用的函数，当action是一个函数被分发时，thunk会阻止action继续向后移交，会直接调用函数

thunk会向函数中传递三个参数：

- dispatch：来自于store.dispatch
- getState:  来自于store.getState
- extra：来自于用户设置的额外参数

```js
export const fetchUsers = () => {
  // 由于thunk的存在，允许action是一个带有副作用的函数
  return async (dispatch, getState, extra) => {
    dispatch(createSetLoadingAction(true))
    const users = await getAllStudents
    dispatch(createSetUsersAction(users))
    dispatch(createSetLoadingAction(false))
  }
}

store.dispatch(fetchUsers())
```

#### redux-promise

如果action是一个promise，则会等待promise完成，将完成的结果作为action触发，如果action不是一个promise，则判断payload是否是一个promise，如果是，等待promise完成，然后将得到的结果作为payload的值触发

```js
export const fetchUsers2 = () => {
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      const action = createAddUserAction({id: 6786, name: 'dfs', age: 89})
      resolve(action)
    },1000)
  })
}

export async function fetchUsers3(){
  const users = await getAllStudents
  return createSetUsersAction(users)
}

export async function fetchUsers3(){
  return {
    type: SETUSER111,
    payload: getAllStudents().then(resp => ({
      datas: resp.datas,
      total: resp.cont
    }))
  }
}

```

#### redux-sage

> 中文文档地址： https://redux-saga-in-chinese.js.org/

- 纯净、强大、灵活
- 在saga任务中，如果yield了一个普通数据，saga不做任何处理，仅仅将数据传递给yield表达式（把得到的数据放到next参数中），因此，在saga中，yield一个普通数据无意义
- saga需要在yield后面放上一些合适的saga指令（saga effect），如果放的是指令，saga中间件会根据不同的指令进行特殊的处理，以控制整个任务的流程
- 每个指令本质上就是一个函数，该函数调用后，会返回一个指令对象，saga会接受到该指令对象进行处理

saga指令：

**一旦saga任务完成（生成器函数运行完成），则saga中间件一定结束**

**指令前面必须使用yield，以确保该指令的返回结果被saga控制**

- take指令：【阻塞】监听某个action，如果action发生了，则会进行下一个指令，take指令仅监听一次，yield得到的是完整的action对象

- all指令：【阻塞】该函数传入一个数组，数组中放入生成器，saga会等待所有的生成器全部完成后才会进一步处理

- takeEvery指令：不断的监听某个action，当某个action到达之后，运行一个函数，takeEvery永远不会结束，不会阻塞

- delay指令：【阻塞】阻塞指定的毫秒数

- put指令：相当于dispatch一个action，用于重新触发action

- call指令：【可能阻塞】用于副作用（通常是异步）函数调用

  ```js
  function* asyncGetAllStudents(){
    yield put(createSetLoadingAction(true))
    // 当saga发现得到的结果是一个promise对象，它会自动等待该promise完成
    // 当完成之后，会把完成的结果作为值传递到下一个next
    // 如果promise对象被拒绝，saga会使用generator.throw抛出一个错误
    const result = yield call(getAllStudents)
    console.log('result',result)
    yield put(createSetUsersAction(result))
    yield put(createSetLoadingAction(false))
  }
  // 数组第一项是绑定的this指向，第二项是异步函数， 后面是参数
  call(['asd', getAllStudents],参数1，参数2.。。。)
  call(getAllStudents,参数1，参数2.。。。)
  call(getAllStudents)
  call({
      context: 'abc', //this指向
      fn: getAllStudents // 异步函数
  })
  ```

- apply指令：【可能阻塞】用于副作用（通常是异步）函数调用，区别是调用时传参不同

  ```js
  const result = yield apply(null,getAllStudents)
  ```

- select指令：用于得到当前仓库中的数据

  ```js
   const state = yield select(state => state.users)  // 如果不传函数作为筛选，返回的是整个仓库的数据
  ```

- cps指令： 【可能阻塞】用于调用那些传统的回调方式的异步函数

- fork指令：用于开启一个新的任务，该任务不会阻塞，该函数需要传递一个生成器函数，返回值是一个对象，类型Task

  ```js
  yield takeEvery(actionTypes.asyncIncrease, asyncIncrease)
  yield fork(asyncIncrease)
  ```

- cancel指令：用于取消一个或多个任务，实际上，取消的实现原理，是利用generator.return， cancel可以不传递参数，此时表示取消当前任务线

- takeLatest：功能和takeEvery一致，只不过，会自动取消掉之前开启的任务

  ```js
  
  function* autoIncreaseFn(){
    let task;
    while(true){
      yield take(actionTypes.autoIncrease)
      if(task){
        yield cancel(task)
      }
      task = yield fork(function* (){
        while(true){
          yield delay(2000)
          yield put(increase())
        }
      })
    }
  }
  
  yield fork(autoIncreaseFn)
  
  // 这句代码功能等同上面代码
  yield takeLatest(actionTypes.autoIncrease,autoIncreaseFn)
  
  ```

- cancelled指令：判断当前任务线是否被取消

- race指令：【阻塞】竞赛，可以传递多个指令，当其中任何一支指令结束后，会直接结束，与Promise.race类似，返回的结果，是最先完成的指令结果，并且，该函数会自动取消其他的任务



## 迭代器和可迭代协议

解决副作用的redux中间件：

> redux-thunk: 需要改动action，可接收action是一个函数
>
> redux-promise：需要改动action，可接受action是一个promise对象，或action.payload是一个promise对象
>
> 以上两个中间件，会导致action或action创建函数不再纯净 
>
> redux-saga将解决这样的问题，它不仅可以保持action、action创建函数、reducer的纯净，而且可以用模块化的方式解决副作用，并且功能非常强大。
>
> redux-saga是建立在es6的生成器基础上的，要熟练的使用saga，必须理解生成器。
>
> 要理解生成器，必须先理解迭代器和可迭代协议。

### 迭代

类似于遍历

遍历：有多个数据组成的集合数据结构(map、set、array等其他类数组)，需要从该结果中依次去除数据进行某种处理。

迭代：按照某种逻辑，依次取出下一个数据进行处理。

### 迭代器

JS语言规定：如果一个对象具有next方法，并且next方法满族一定的约束，则该对象是一个迭代器（iterator）。

next方法的约束：该方法必须返回一个对象，该对象至少具有两个属性：

- value:  any类型，下一个数据的值，如果done为true，通常会将value值设置为

- done: 下一个数据的值，是否已经迭代完成

  ```js
  // 迭代器
      var iterator = {
        total: 3, // 可迭代三次
        i: 1, // 当前的迭代次数
        next(){
          var obj = {  // 当前这一次迭代到的数据
            value: this.i > this.total ? undefined : this.i,
            done: this.i > this.total
          }
          this.i++
          return obj;
        }
      }
  ```

  

通过迭代器的next方法，可以依次取出数据，并可以根据返回的done属性判定书否迭代结束

```js
// 无限迭代
    var iterator = {
      next(){
        var obj = {
          value: Math.random(),
          done: false
        }  
        return obj;    
      }
    }
```

```js
//一个无限的斐波拉契数列 1 1 2 3 5 8...
    var iterator = {
        a: 1,
        b: 1,
        curIndex: 1, // 当前取到斐波拉契数列的第几位，从1开始
        next(){
          if(this.curIndex === 1 || this.curIndex === 2){
              this.curIndex ++
              return {
                value: 1,
                done: false
              } 
          }
          var c = this.a + this.b;
          this.curIndex++
          this.a = this.b
          b = c
          return {
            value: c,
            done: false
          }
        }
      }
     for (let index = 0; index < 5; index++) {
        console.log(iterator.next().value)
      }
```

```js
// 一个一个迭代，直到不能迭代为止
var next = iterator.next();
while(!next.done){
    // 若当前迭代的数据不是迭代器的结束
    console.log(next.value)
    next = iterator.next()
}
```

### 迭代器创建函数 iterator creator

它是指一个函数，调用该函数后，返回一个迭代器，则该函数称之为迭代器创建函数，可以简称为迭代器函数

```js
// 迭代器创建函数，返回一个迭代器
    function creatIterator(total){
      var i = 1;
      return {
        next(){
          var obj = {  // 当前这一次迭代到的数据
            value: i > total ? undefined : i,
            done: i > total
          }
          i++
          return obj;
        }
      }
    }

// 使用
    var iterator = creatIterator(100)
    var next = iterator.next();
    while(!next.done){
        // 若当前迭代的数据不是迭代器的结束
        console.log(next.value)
        next = iterator.next()
    }
```

### 可迭代协议

es6中出现了for-of循环，该循环就是用于迭代某个对象的，因此for-of循环要求对象必须是可迭代的（对象必须满足可迭代协议）

可迭代协议：用于约束一个对象，如果一个对象满足下面的规范，则该对象满足可迭代协议，也称之为该对象是可迭代的

可迭代协议的约束如下：

1. 对象必须有一个知名符号属性（Symbol.iterator）
2. 该属性必须是一个无参的迭代器创建函数

```js
// obj满足可迭代协议，obj可被迭代
var obj = {
    [Symbol.iterator]:  function creatIterator(){
        var total= 3, i = 1;
        return {
            next(){
                var obj = {  // 当前这一次迭代到的数据
                    value: i > total ? undefined : i,
                    done: i > total
                }
                i++
                return obj;
            }
        }
    }
}
```

### forof循环原理

调用对象的[Symbol.iterator]方法，得到一个迭代创建函数，不断调用next方法，只要返回的done为false，则将返回的value传递给变量，然后进入循环体执行一次

```js
 
for (const item of obj) {
     console.log(item)
 }

// 原理
 var iterator = obj[Symbol.iterator]()
 var result = iterator.next()
 while(!result.done){
     const item = result.value
     console.log(item)  // 执行循环体，循环内部的逻辑代码
     result = iterator.next()
 }
    
```

## 生成器 generator

生成器：由构造函数Generator创建的对象，该对象既是一个迭代器，同时，又是一个可迭代对象（满足可迭代协议的对象）

**Generator构造函数，不提供给开发者者使用，仅作为js引擎内部使用**

### generator function

生成器函数（生成器创建函数）： 该函数用于创建生成器。

es6新增了一个特殊的函数，叫做生成器函数，只要在函数名与function关键字之间加上一个*号，则该函数会自动返回一个生成器

```js
// 生成器函数
function* createGennerator(){} 
```

生成器函数的特点：

1. 调用生成器函数会返回一个生成器，而不是执行函数体（因为生成器函数的函数体执行受到生成器的控制）

2. 每当调用了生成器的next方法，生成器的函数体会从上一次yield的位置（或开始位置）运行到下一个yield

   1. yield关键字只能在生成器内部使用，不可以在普通函数内部使用
   2. 它表示暂停，并返回一个当前迭代的对象
   3. 如果没有下一个yield，到了函数结束，则生成器的next方法得到的结果中的done为true

3. yield关键字后面的表达式返回的数据，会作为当前迭代的数据

4. 生成器函数的返回值，会作为迭代结束时的value

   1. 但是如果在结束后，仍然反复调用next，则value值为undefined

5. 生成器调用next的时候可以传递参数，该参数会作为生成器函数体上一次yield表达式的值

   1. 生成器第一次调用next函数的时候，传递参数无意义

   ```js
   // 生成器函数
   function* createGennerator(){
       console.log('生成器函数的函数体-开始')
       let result = yield 1;  // 将1作为第一次的迭代的值，假设第二调用next方法时传递了参数abc，即next(abc),则result变量第一次的值为abc，以此类推
       console.log('生成器函数的函数体-运行1', result)
       result = yield 2;
       console.log('生成器函数的函数体-运行2', result)
       result = yield 3;
       console.log('生成器函数的函数体-运行3', result)
       return 4
   } 
   
   var generator = createGennerator()
   
   // 循环取值
   var result = generator.next()
   while(!result.done){
       const val = result.value;
       result = generator.next(val)
   }
   ```

   ```js
   // 异步请求数据
    function asyncGetData(){
        return new Promise(resolve => {
            setTimeout(()=>{
                resolve('jj')
            },1000)
        })
    }
   
   // 任务生成器
   function* task(){
       console.log('开始获取数据。。。')
       const resut = yield asyncGetData();
       console.log('获取到数据1',resut)
       const resut1 = yield asyncGetData();
       console.log('获取到数据2',resut1)
       const resut3 = yield 3;
       console.log('获取到数据3',resut3)
   }
   
   // 通用函数：运行一个生成器任务
   function run(generatorFn){
       const generator = generatorFn()
       next()
       // 封装了generator的next方法，进行下一次迭代
       function next(nextvalue){
           const result = generator.next(nextvalue)
           if(result.done){
               return
           }
           var value = result.value
           if(typeof value.then === 'function' ){
               value.then(data => next(data))
           }else{
               next(value)
           }
       }
   }
   
   run(task)
   
   // 执行结果
   开始获取数据。。。
   获取到数据1 jj
   获取到数据2 jj
   获取到数据3 3
   ```

6. 生成器带有一个throw方法，该方法与next的效果相同，唯一的区别在于：

   1. next方法传递的参数会被返回成一个正常的值
   2. throw方法传递的参数是一个错误对象，会导致生成器函数内部发生一个错误

7. 生成器带有一个return方法，该方法会直接结束生成器函数

8. 如需要在生成器内部调用其他生成器，注意： 如果直接调用的到的是一个生成器，如果加入*号调用，则进入其生成器内部执行

   ```js
    function* g2(){
        console.log('g2-开始')
        let result = yield 'g1';
        console.log('g2-运行1')
        result = yield 'g2';
        return 'g2结束'
    }
   
    function* createGennerator(){
        console.log('生成器函数的函数体-开始')
        let result = yield 1; 
        result = yield* g2(); // result为g2函数的返回值 g2结束
        console.log('生成器函数的函数体-运行1', result)
        result = yield 2;
        console.log('生成器函数的函数体-运行2', result)
        result = yield 3;
        console.log('生成器函数的函数体-运行3', result)
        return 4
    } 
   ```

   

## redux-actions

> 官方文档： https://redux-actions.js.org/

> 该库用于简化action-types，action-creator以及reducer

### createAction(s)

#### createAction

该函数用于帮助你创建一个action创建函数（action creator）

```js
export const increase = createAction(actionTypes.increase)  
// 上面的increase得到的就是一个action创建函数，如下

 function increase(){
  return {
    type: actionTypes.increase
  }
}


// 有paylod的情况，需要传递一个函数，函数返回需要更改的值
// 第三个参数是形成一个meta，表示附带信息
export const add = createAction(actionTypes.add, number => number，function(){})
```

#### createActions

该函数用于帮助创建多个action创建函数

```js

export const {increase, decrease, asyncDecrease,asyncIncrease,add,autoIncrease,stopAutoIncrease} = createActions({
  INCREASE: null,
  DECREASE: null,
  ASYNC_INCREASE: null,
  ASYNC_DECREASE: null,
  AUTOINCREASE: null,
  STOPAUTOINCREASE: null,
  ADD: number => number
})

// 得到的是一个小驼峰命名的对象
{
    increase： fn(),
        ....,
    add: fn(number)
}

```

### handleAction(s)

#### handleAction

简化针对单个reducer类型的reducer处理，当它匹配到对应的action类型 后，会执行对应的函数

```js

import {increase} from '../../action/counter'

function(state = 10, {type, payload}){
  switch (type) {
    case actionTypes.increase:
      return state + 1;
    
    default:
      return state;
  }
}
// 以下代码等同于上面代码， 参数1是action-type，参数2是数据处理函数，参数3是默认值，自动匹配action
const reducer = handleAction('INCREASE', (state, action) => {
  return state + 1;
}, 10)

// 参数1还可以有别的写法
// createActions里面导出的action创建函数，该函数有一个toString方法，可以得到对应的action-type
// 避免硬编码
const reducer = handleAction(increase, (state, action) => {
  return state + 1;
}, 10)

```

#### handleActions

简化针对多个action类型的reducer处理

