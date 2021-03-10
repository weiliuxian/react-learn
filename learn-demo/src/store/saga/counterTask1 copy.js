import {apply, call, delay, put, select, take,takeEvery, fork, cancel, takeLatest} from 'redux-saga/effects'
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

function* autoIncreaseFn(){
  let task;
  while(true){
    
       yield take(actionTypes.autoIncrease)
    if(task){
       yield cancel(task)
    }
    task = yield fork(function* (){
      while(true){
        yield delay(2000)
        yield put(increase())
      }
    })
  }
}

var isStop = false; // 是否停止
function* autoIncreaseFn2(){
  isStop = false
  while(true){
    yield delay(2000)
    if(isStop){
      break
    }
    yield put(increase())
  }
}

function* stopAutoIncrease(){
  isStop = true
}
export default function* (){
  // while(true){
    // const action = yield take(actionTypes.asyncIncrease)
    // console.log('监听到了asyncIncrease', action)
  // }
  //  yield takeEvery(actionTypes.asyncIncrease, asyncIncrease)
  //  yield takeEvery(actionTypes.asyncDecrease, asyncDecrease)
  //  yield takeEvery(fetchStudents, asyncGetAllStudents)
  //  yield takeEvery(actionTypes.autoIncrease,autoIncreaseFn)   // 此时拿不到上一个任务，因此难以取消任务监听
  // yield fork(autoIncreaseFn)
  // yield takeLatest(actionTypes.autoIncrease,autoIncreaseFn)


  yield takeLatest(actionTypes.autoIncrease,autoIncreaseFn2)
  yield takeLatest(actionTypes.stopAutoIncrease,stopAutoIncrease)

    console.log('正在监听asyncIncrease、asyncDecrease')
}


// function takeEvery(actionType, saga){
//   return fork(function* (){
//     while(true){
//       const action = yield take(actionType)
//       fork(saga)
//     }
//   })
// }