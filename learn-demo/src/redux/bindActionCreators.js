
export default function(actionCreators, dispatch){
    if(typeof actionCreators === 'function'){
        return getAutoDispatchCreator(actionCreators, dispatch)
    }
    else if(typeof actionCreators === 'object'){
        const result = {}; // 返回结果
        for (const key in actionCreators) {
            if (Object.hasOwnProperty.call(actionCreators, key)) {
                const actionCreator = actionCreators[key];
                if(typeof actionCreator === 'function'){
                    result[key] = getAutoDispatchCreator(actionCreator, dispatch)
                }
            }
        }
        return result;
    }else{
        throw new TypeError('actionCreators must be a object or function which means ation creator')
    }
}

/**
 * 得到一个自动分发的action创建函数
 */
function getAutoDispatchCreator(actionCreators, dispatch){
    return function(...args){
       const action =  actionCreators(...args);
       dispatch(action)
    }
}