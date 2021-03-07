// import {createStore,bindActionCreators} from '/redux'
import {createStore,bindActionCreators,applyMiddleware} from '../redux'
import * as numberAction from './action/number-action'
import reducer from './reducer'
import {createAddUserAction, createDeleteUserAction} from './action/usersAction'
import {v1 as uuid} from 'uuid'
import logger from 'redux-logger'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

// 约定action的格式：{type: '操作类型', payload:附加数据}
const sagaMid = createSagaMiddleware(); // 创建一个saga的中间件

export default createStore(reducer,
    applyMiddleware(
        sagaMid,
        logger
    )
)  

sagaMid.run(rootSaga)// 启动saga任务


// const actionCreators = {
//     addUser: createAddUserAction,
//     deleteUser: createDeleteUserAction
// }


// const actions = bindActionCreators(actionCreators,store.dispatch)
// actions.addUser({id: 2, name: 'bhh', age: 19})
// actions.deleteUser(2)

// 第一个参数，是action创建函数合并的对象，第二个参数是仓库的dispatch函数
// 得到一个新的对象，新对象中的属性与第一个参数的属性名一致
// const actions = bindActionCreators(actionCreators,store.dispatch)
// // 得到一个increase action,并直接分发
// boundActions.getIncreaseAction()
// console.log('boundActions',boundActions)

// store.dispatch(numberAction.getDecreaseAction());  // 向仓库分发action
// store.dispatch(numberAction.getSetAction(20));  // 向仓库分发action

// store.dispatch(createAddUserAction({id: uuid(), name: 'bhh', age: 19}))

// const logger1 = store => next => action => {
//     console.log('旧数据',store.getState())
//     console.log('action',action)
//     next(action)
//     console.log('新数据',store.getState())
//     console.log('')
// }
// const logger2 = store => next => action => {
//     console.log('旧数据',store.getState())
//     console.log('action',action)
//     next(action)
//     console.log('新数据',store.getState())
//     console.log('')
// }

/**
 * 一个中间件
 * @param {*} store 
 */
 function logger1(store){
    return function(next){
        // 下面的函数是最终要应用的dispatch
        return function (action){
            console.log('旧数据1',store.getState())
            console.log('action',action)
            next(action)
            console.log('新数据1',store.getState())
            console.log('')
        }
    }
}

// function logger2(store){
//     return function(next){
//         // 下面的函数是最终要应用的dispatch
//         return function (action){
//             console.log('旧数据1',store.getState())
//             console.log('action',action)
//             next(action)
//             console.log('新数据1',store.getState())
//             console.log('')
//         }
//     }
// }
