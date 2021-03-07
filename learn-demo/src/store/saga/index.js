import {all} from 'redux-saga/effects'
import {actionTypes} from '../action/counter'
import counterTask1 from './counterTask1'
import counterTask2 from './counterTask2'
/**
 * saga任务
 */
export default function* (){
  // while(true){
  //   const action = yield take(actionTypes.asyncIncrease);
  //   console.log('asyncincrease 发生了', action)
  // }

  yield all([counterTask1(), counterTask2()])
  console.log('全部')
} 