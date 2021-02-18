# React Hook

## Hook简介

- Hook是React16.8.0之后出现

- 组件： 无状态组件（函数组件）、类组件

- 类组件中的麻烦：

1. this指向问题
2. 繁琐的生命周期（渲染过程）
3. 其他问题

**H00k专门用于增强函数组件的功能（在类组件中不能使用），使之理论上可以成为类组件的替代品**

官方强调： 没有必要更改已经完成的类组件，官方目前没有计划要取消类组件

Hook(钩子)，本质上是一个函数（命名上总是以use开头），该函数可以挂载任何功能

## Hook种类

- useState
- useEffect
- 其他

### State HooK

State Hook是一个在函数组件中使用的函数（useState），用于在函数组件中使用状态

```react
import React , { useState } from 'react'
export default function App(){
    const arr = useState(0);  // 使用一个状态，该状态的默认值是0
    const n = arr[0]; // 当前的值
    const setN = arr[1]; // 得到一个函数，该函数用于改变状态
	return <div>
        <button onClick={() => {
                setN(n-1)
            }}>-</button>
        <span>{n}</span>
        <button onClick={() => {
                setN(n+1)
            }}>+</button>
    </div>
}

解释：
useState(0);   
// 使用一个状态，该状态的默认值是0
// 没有参数的时候，默认值就是undefined

```

#### useState函数特点：

- 有一个参数，表示状态的默认值
- 函数的返回值是一个数组，该数组一定包含两项
  1. 第一项：当前状态的值
  2. 第二项：改变状态的函数

- 一个函数组件中可以有多个状态，这种做法非常有利于横向切分关注点

  ```react
  import React , { useState } from 'react'
  export default function App(){
      const [n,setN] = useState(0);
      const [visible,setVisible] = useState(true)
  	return <div>
           	<button onClick={() => {
                          setVisible(!visible)
                      }}>显示/隐藏</button>
              <p style={{display:visible?'block':'none'}}>
                  <button onClick={() => {
                          setN(n-1)
                      }}>-</button>
                  <span>{n}</span>
                  <button onClick={() => {
                          setN(n+1)
                      }}>+</button>
                </p>
          </div>
  }
  
  //插件： ES7 React/Redux/GraphQL/React-Native snippets 代码段
  // uses
  ```

#### State Hook原理

- 当运行一个函数组件时（调用该函数）时的过程：
  1.  第N次调用useState
  2. 检查该节点的状态数组是否存在下标N
  3. 如果不存在
     - 使用默认值创建一个状态
     - 将该状态加入到状态数组中，下标为N 
  4. 存在
     - 忽略默认值
     - 直接得到状态值

#### 注意细节

- useState最好写在函数的起始位置，便于阅读
- useState严禁出现在判断、循环中
- useState返回的函数（数组的第二项），引用不变（节约内存空间）
- 如果使用函数改变数据，若数据和之前的数据完全相等（使用Object.is比较），不会导致重新渲染，以达到优化效率的目的
- **使用函数改变数据，传入的值不会和原来的数据进行合并，而是直接替换（类组件是混合）**
- **如果某些状态之间没有必然的联系，应该分化为不同的状态，而不要合并成一个对象**
- **和类组件的状态一样，函数组件中改变状态可能是异步的（在DOM事件中），多个状态变化会合并以提高效率，此时不能信任之前的状态，而应该使用回调的方式改变状态**
- 如果要实现强制刷新组件，在类组件中使用forceUpdate函数（此时不会运行shouldComponentUpdate函数），函数组件使用一个空对象的useState，调用改变状态的函数时也传入一个空对象，此时新的对象和已存储的对象引用地址不一致，导致强制刷新

###  Effect Hook

- Effect Hook： 用于在函数组件中处理副作用
- 副作用：

1.  ajax请求
2. 计时器
3. 其他异步操作
4. 更改真实DOM对象
5. 本地存储
6. 其他会对外部产生影响的操作

本质上是一个函数：useEffect，该函数接收一个函数作为参数，接收的函数就是需要进行副作用操作的函数

```react
import React, {useState,useEffect} from 'react'
export default function App(){
    const [n,setN] = useState(0)
    
    //document.title = `计时器为${n}` // 副作用代码
    useEffect(() => {
        document.title = `计时器为${n}` // 副作用代码
    })
    
    return <div>
                <span>{n}</span>
                <button onClick={()=>setN(n+1)}></button>
    		</div>
}
```

#### 细节

1. 副作用函数的运行时间点，是在页面完成真实的UI渲染之后。因此它的执行是异步的，并且不会阻塞浏览器
   1. 与类组件中componentDidMount和componentDidUpdate的区别
   2. componentDidMount和componentDidUpdate，更改了真实DOM，但是用户还没有看到UI更新，同步的。
   3. useEffect中的副作用函数，更改了真实DOM，并且用户已经看到了UI更新，异步的。

2. 每个函数组件中，可以多次使用useEffect，但不要放入判断或循环等代码块中。

3. useEffect中的副作用函数，可以有返回值，返回值必须是一个函数，该函数叫做清理函数
   1. 该函数运行时间点，在每次运行副作用函数之前
   2. 首次渲染组件不会运行
   3. 组件被销毁时一定会运行

4. useEffect函数，可以传递第二个参数
   1. 第二个参数是一个数组
   2. 数组中记录该副作用的依赖数据
   3. 当组件重新渲染后，只有依赖数据与上一次不一样的时，才会执行副作用
   4. 所以，当传递了依赖数据之后，如果数据没有发生变化
      1. 副作用函数仅在第一次渲染后运行
      2. 清理函数仅在卸载组件后运行

5. 副作用函数中，如果使用了函数上下文中的变量，则由于闭包的影响，会导致副作用函数中变量不会实时变化。

6. 副作用函数在每次注册时，会覆盖掉之前的副作用函数，因此，尽量保持副作用函数稳定，否则控制起来会比较复杂。



### 自定义Hook

定义：将一些常用的、跨越多个组件的hook功能，抽离出去形成一个函数，该函数就是自定义Hook

由于其内部需要使用Hook功能，所以他本身也需要按照Hook的规则实现：

- 函数名必须以use开头
- 调用自定义Hook函数时，应该放到顶层（不能放到判断、循环等代码块中）

例如：

1. 很多组件都需要在第一次加载完成后，获取所有学生数据

   1. 自定义文件夹myHooks，useAllStudents.js

   ```react
   //useAllStudents.js
   import {useEffect,useState} from 'react'
   import {getAllStudents} from '../services/student'
   /**
    * 当组件首次加载完成后，获取所有学生数据
    */
   export function useAllStudents (){
     const [students, setStudents] = useState([])
     useEffect(()=>{
       (async ()=>{
         const stus = await getAllStudents()
         setStudents(stus)
       })()
     },[])
     return students
   }
   
   // Test.js
   import {useAllStudents} from './myHooks/useAllStudents'
   function Test(){
       const stus = useAllStudents();
       const list = stus.map(it => <li key={it.id}>{it.name}</li>)
       return <ul>
           {list}
       </ul>
   }
   
   ```

2.  分页获取数据

   ```react
   import {useEffect,useState} from 'react'
   import {getStudents} from '../services/student'
   /**
    * 根据页码和页容量获取学生数据，得到有个相应结果，并且当页码和页容量变化时，将重新获取数据
    */
   export function useAllStudents (page=1,limit=10){
     const [resp, setResp] = useState({})
     useEffect(()=>{
       (async ()=>{
         const resp = await getStudents(page,limit)
         setResp(resp)
       })()
     },[page,limit])
     return resp
   }
   ```

3. 很多组件都需要在第一次加载完成后，启动一个计时器，然后在组件销毁时卸载

   ```react
   import {useEffect} from 'react'
   /**
    * 组件首次渲染后，启动一个interval计时器
    * 组件卸载后，清除该计时器
    */
   export default (func,duration) => {
     useEffect(()=> {
       const timer = setInterval(func,duration)
       return () => {
         clearInterval(timer)
       }
     },[])
   }
   ```

   

### Reducer Hook

官方已经规定了： useReducer

flux: Facebook出品的一个数据流框架

1. 规定了数据是单向流动的

2. 数据存储在数据仓库中（目前，可以认为state就是一个存储数据的仓库）

3. action是改变数据的唯一原因（本质上就是一个对象，action有两个属性）

   1. type：字符串，动作类型

   2. payload： 任意类型，动作发生后的附加信息

   3. 例如：如果是添加一个学生，action可以描述为

      1. ```js
         {type: "addStudent",payload: {学生对象的各种信息}}
         ```

   4. 例如：如果要删除一个学生，action可以描述为

      1. ```js
         {type: "deleteStudent",payload: 学生Id}
         ```

4. 具体改变数据的是一个函数，该函数叫做reducer

   1. 该函数接收两个参数
      1. state：表示当前数据仓库中的数据
      2. action： 描述了如何去改变数据，以及改变数据的一些附加信息
   2. 该函数必须有一个返回结果，用于表示数据仓库变化之后的数据
      1. flux要求，对象是不可变的，如果返回对象，必须创建新的对象
   3. reducer必须是纯函数，不能有任何副作用

5. 如果要触发reducer，不可以直接调用，而是应该调用一个辅助函数dispath

   1. 该函数仅接受一个参数：action
   2. 该函数会间接调用reducer，以达到改变数据的目的

```react
/**
 * 该函数，根据当前的数据，以及action，生成一个新的数据
 * @param {*} state 
 * @param {*} action 
 */
function reducer(state,action){
    switch(action.type){
        case 'increase':
            return state + 1;
        case 'decrease':
            return state - 1;
        default:
            return state
    }
}
export default function App(){
    const [n,setN] = useState(0)
    function dispatch(action){
        const newN = reducer(n,action)
        setN(newN)
    }
    return (
        <div>
            <button onClick={()=>{dispatch({type:'decrease'})}}>-</button>
            <div>{n}</div>
            <button onClick={()=>{
                dispatch({type:'increase'})
            }}>+</button>
        </div>
    )
}
```

```react
/**
 * 该函数，根据当前的数据，以及action，生成一个新的数据
 * @param {*} state 
 * @param {*} action 
 */
function reducer(state,action){
    switch(action.type){
        case 'increase':
            return state + 1;
        case 'decrease':
            return state - 1;
        default:
            return state
    }
}
/**
 * 自定义Hook，用于抽离数据处理
 */
function useReducer(){
    const [n,setN] = useState(0)
    function dispatch(action){
        const newN = reducer(n,action)
        console.log(`日志：n的值 ${n}->${newN}`)
        setN(newN)
    }
    return [n,dispatch]
}
export default function App(){
    const [n,dispatch] = useReducer()
    return (
        <div>
            <button onClick={()=>{dispatch({type:'decrease'})}}>-</button>
            <div>{n}</div>
            <button onClick={()=>{
                dispatch({type:'increase'})
            }}>+</button>
        </div>
    )
}
```

```js
// useReducer实现代码
import {useState} from 'react'
/**
 * 通用的reducer函数
 * @param {function} reducer 标准格式,两个参数
 * @param {any} initialState  初始状态
 * @param {function} initFunc  用于计算初始值的函数
 */
function useReducer(reducer,initialState，initFunc){
    const [state,setState] = useState(initFunc?initFunc(initialState):initialState)
    function dispatch(action){
        const newState = reducer(state,action)
        console.log(`日志：n的值 ${state}->${newState}`)
        setState(newState)
    }
    return [state,dispatch]
}
```

### Context Hook

用于获取上下文数据

```react
import React, {useContext} from 'react'

const ctx = React.createContext()

// 原始写法
function Test(){
    <ctx.Consumer>
        {value => <h1>上下文：{value}</h1>}
    </ctx.Consumer>
}
// Hook写法
function Test(){
    const value = useContext(ctx)
    return <h1>上下文：{value}</h1>
}
export default function App(){
    return (
        <div>
            <ctx.Provider value="abc">
                <Test />
            </ctx.Provider>
        </div>
    )
}
```

### Callback Hook

函数名： useCallback,用于得到一个固定引用值的函数，通常用它进行性能优化

用法：

- 该函数有两个参数：

1. 函数，useCallback会固定该函数的引用，只要依赖项没有发生改变，则始终返回之前函数的地址
2. 数组，记录依赖项

- 该函数返回：引用相对固定的函数地址

```react

import {useCallback} from 'react'

function Parent(){
    const handleClick = useCallback(()=> setTxt(Math.random()),[])
    return (
    <test onClick={handleClick}/>
    )
}

```

### Memo Hook

用于保持一些比较稳定的数据，用于性能优化

```react
import {useMemo} from 'react'

function Parent(){
    const handleClick = useMemo(()=>{ 
        return () => {
            setTxt(Math.random())
        }
    },[])
    return (
    <test onClick={handleClick}/>
    )
}
```

**如果React元素本身的引用没有发生变化，一定不会重新渲染**

### Ref Hook

useRef函数： 

- 一个参数： 默认值
- 返回一个固定的对象，{current:值 }

### ImperativeHandle Hook

```react
function Test(props,ref) {
	useImperativeHandle(
		ref,
		()=>{return 1},  // 初始值 ，相当于current = 1
		[]               // 依赖项
	)
}
```

- 如果不给依赖项，则每次运行函数组件都会调用该方法
- 如果给了依赖项，则第一次调用后会进行缓存，只有依赖项发生变化才会重新调用函数