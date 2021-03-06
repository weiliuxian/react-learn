import actionTypes from './utils/actionTypes'
import isPlainObject from './utils/isPlainObject'

/**
 * 
 * @param {function} reducer 
 * @param {*} defaultState 默认状态值
 */
export default function createStore(reducer, defaultState, enhanced){
    //enhanced 表示applymiddleware返回的函数
    if(typeof defaultState === 'function'){
        enhanced = defaultState
        defaultState = undefined
    }

    if(typeof enhanced === 'function'){
        // 进入applymiddleware的处理逻辑
        return enhanced(createStore)(reducer,defaultState)
    }

    let currentReducer = reducer,  // 当前使用的reducer
        currentState = defaultState; // 当前仓库中状态

    const listeners = []; //记录所有的监听器

    function dispatch(action){
       
        // 验证action是否是平面对象
        if(!isPlainObject(action)){
            throw new TypeError('action must be a plain object')
        }
        //验证action的type属性是否存在
        if(action.type === undefined){
            throw new TypeError('action must has a property of type')
        }
        currentState = currentReducer(currentState, action);

        // 运行所有的监听器
        for (const listener of listeners) {
            listener();
            let isRemove = false;
            return function(){
                if(isRemove) return;
                const index = listeners.indexOf(listener);
                listeners.splice(index,1);
                isRemove = true;
            }
        }
    }
    function getState(){
        return currentState;
    }
    /**
     * 添加一个监听器（订阅器）
     */
    function subscribe(listener){
        listeners.push(listener);
    }

    // 创建仓库时，需要分发一次初始的action
    dispatch({
        type: '@@redux/INIT'+ actionTypes.INIT(7)
    })

    return {
        dispatch,
        getState,
        subscribe
    }
}