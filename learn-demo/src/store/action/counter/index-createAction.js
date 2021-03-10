
import {createAction} from 'redux-actions'

export const actionTypes = {
  increase: 'INCREASE', // 符合flux标准
  decrease: Symbol('decrease'),
  asyncIncrease: Symbol('async-increase'),
  asyncDecrease: Symbol('async-decrease'),
  fetchStudents: Symbol('fetchStudents'),
  autoIncrease: Symbol('autoIncrease'),  // 自动增加
  stopAutoIncrease: Symbol('stopAutoIncrease'),  // 停止自动增加
  add: Symbol('add')
}

export const increase = createAction(actionTypes.increase)
export const decrease = createAction(actionTypes.decrease)
export const asyncIncrease = createAction(actionTypes.asyncIncrease)
export const asyncDecrease = createAction(actionTypes.asyncDecrease)
export const autoIncrease = createAction(actionTypes.autoIncrease)
export const stopAutoIncrease = createAction(actionTypes.stopAutoIncrease)

// paylod
export const add = createAction(actionTypes.add, number => number)

// export function increase(){
//   return {
//     type: actionTypes.increase
//   }
// }

