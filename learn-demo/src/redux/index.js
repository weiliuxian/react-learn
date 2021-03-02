import {createStore,bindActionCreators} from 'redux'
import * as numberAction from './action/number-action'
import * as actionTypes from './action/action-type'
// 约定action的格式：{type: '操作类型', payload:附加数据}


/**
 * reducer本质上就是一个普通函数
 * @param state 之前仓库中的状态（数据）
 * @param action 描述要做什么的对象
 */
function reducer(state, action){
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

const store = createStore(reducer, 10)  // 10为默认值

console.log('1',store.getState())//仓库中当前的数据

// 第一个参数，是action创建函数合并的对象，第二个参数是仓库的dispatch函数
// 得到一个新的对象，新对象中的属性与第一个参数的属性名一致
const boundActions = bindActionCreators(numberAction,store.dispatch)
// 得到一个increase action,并直接分发
boundActions.getIncreaseAction()
console.log('boundActions',boundActions)

// store.dispatch(numberAction.getDecreaseAction());  // 向仓库分发action
// store.dispatch(numberAction.getSetAction(20));  // 向仓库分发action


console.log('2',store.getState())