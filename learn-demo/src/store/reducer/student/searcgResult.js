import {actionTypes} from '../../action/student/searchResult'
/**
 * 控制查询结果的reducer
 * @param {*} state 
 * @param {*} action 
 */
const initialState = {
  datas: [],
  total: 0,
  isLoading: false
}
 export default function(state = initialState, {type, payload}){
  switch (type) {
    case actionTypes.setStudentAndTotal:
      return {
        ...state,
        ...payload
      };

    case actionTypes.setIsLoading:
      return {
        ...state,
        isLoading: payload
      }

    default:
      return state
  }
 
}