import { cancel, cancelled, delay, fork, put, take } from 'redux-saga/effects'
import {actionTypes,increase,decrease, autoIncrease} from '../action/counter'
import {getAllStudents} from '../../services/student'
import {fetchStudents, createSetLoadingAction,createSetUsersAction} from '../action/usersAction'

// 自动增加和停止的流程控制
function* autoTsk(){
  while(true){
    yield take(actionTypes.autoIncrease) // 只监听autoIncrease
    const task = yield fork(function* (){
      try {
        while(true){
          yield delay(2000)
          yield put(increase())
        }
      }
      finally {
        if(yield cancelled()){
          console.log('自动增加任务取消了')
        }
      }
    })
    yield take(actionTypes.stopAutoIncrease) // 转而监听stopAutoIncrease
    yield cancel(task)
  }
}

export default function* (){
    yield fork(autoTsk)
    console.log('正在监听asyncIncrease、asyncDecrease')
}
