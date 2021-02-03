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