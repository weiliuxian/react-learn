
import {actionTypes} from '../../action/student/searchCondition'
/**
 * 控制查询条件的reducer
 * @param {*} state 
 * @param {*} action 
 */
const innitialState = {
  key: '',
  sex: -1,
  page: 1,
  limit: 10
}
export default function(state = innitialState, {type, payload}){
  switch (type) {
    case actionTypes.change:
      return {...state, ...payload}
  
    default:
      return state
  }
  
}