import {createStore,bindActionCreators} from 'redux'
import * as numberAction from './action/number-action'
import reducer from './reducer'
import {createAddUserAction} from './action/usersAction'
import {v1 as uuid} from 'uuid'

// 约定action的格式：{type: '操作类型', payload:附加数据}


const store = createStore(reducer)  


// 第一个参数，是action创建函数合并的对象，第二个参数是仓库的dispatch函数
// 得到一个新的对象，新对象中的属性与第一个参数的属性名一致
const boundActions = bindActionCreators(numberAction,store.dispatch)
// 得到一个increase action,并直接分发
boundActions.getIncreaseAction()
console.log('boundActions',boundActions)

// store.dispatch(numberAction.getDecreaseAction());  // 向仓库分发action
// store.dispatch(numberAction.getSetAction(20));  // 向仓库分发action




store.dispatch(createAddUserAction({id: uuid(), name: 'bhh', age: 19}))

console.log('2',store.getState())