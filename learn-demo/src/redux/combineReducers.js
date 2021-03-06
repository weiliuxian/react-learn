import isPlainObject from './utils/isPlainObject'
import actionTypes from './utils/actionTypes'

function validateReducers(reducers){
  if(typeof reducers !== 'object'){
    throw new TypeError('reducers must be a object');
  }
  if(!isPlainObject(reducers)){
    throw new TypeError('reducers must be a plian object');
  }

  // 验证reducer的返回结果是不是undefined
  for (const key in reducers) {
    if (Object.hasOwnProperty.call(reducers, key)) {
      const reducer = reducers[key];
      // 传递一个特殊的type值
      let state = reducer(undefined, {type: actionTypes.INIT()})
      if(state === undefined){
        throw new TypeError('reducers must not return undefinded')
      }

      state = reducer(undefined, {type: actionTypes.UNKOWN()})
      if(state === undefined){
        throw new TypeError('reducers must not return undefinded')
      }
    }
  }

}

export default function(reducers){
  // 验证
  validateReducers(reducers)
  // 返回的是一个reducer函数
  return function(state = {}, action){
    const newState = {}; // 要返回的新的状态

    for (const key in reducers) {
      if (Object.hasOwnProperty.call(reducers, key)) {
        const reducer = reducers[key];
        newState[key] = reducer(state[key], action)
        
      }
    }

    // 返回的是状态
    return newState;
  }
}