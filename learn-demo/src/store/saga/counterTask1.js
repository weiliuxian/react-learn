import {apply, call, delay, put, select, take,takeEvery} from 'redux-saga/effects'
import {actionTypes,increase,decrease} from '../action/counter'
import {getAllStudents} from '../../services/student'
import {fetchStudents, createSetLoadingAction,createSetUsersAction} from '../action/usersAction'

function* asyncIncrease(){
  yield delay(2000)
  console.log('触发了asyncIncrease')  // 两秒之后执行该行代码
  const resutl = yield put(increase())
}
function* asyncDecrease(){
  yield delay(2000)
  console.log('触发了asyncDecrease')
  yield put(decrease())
}

function* asyncGetAllStudents(){
  yield put(createSetLoadingAction(true))
  // 当saga发现得到的结果是一个promise对象，它会自动等待该promise完成
  // 当完成之后，会把完成的结果作为值传递到下一个next
  // 如果promise对象被拒绝，saga会使用generator.throw抛出一个错误
  const result = yield apply(null,getAllStudents)
  console.log('result',result)
  yield put(createSetUsersAction(result))
  yield put(createSetLoadingAction(false))
  const state = yield select(state => state.users)
  console.log('state',state)
}
export default function* (){
  // while(true){
    // const action = yield take(actionTypes.asyncIncrease)
    // console.log('监听到了asyncIncrease', action)
  // }
   yield takeEvery(actionTypes.asyncIncrease, asyncIncrease)
   yield takeEvery(actionTypes.asyncDecrease, asyncDecrease)
   yield takeEvery(fetchStudents, asyncGetAllStudents)
    console.log('正在监听asyncIncrease、asyncDecrease')
}