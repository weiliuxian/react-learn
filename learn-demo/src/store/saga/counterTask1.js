import { cancel, cancelled, delay, fork, put, take,race, call } from 'redux-saga/effects'
import {actionTypes,increase,decrease, autoIncrease} from '../action/counter'
import {getAllStudents} from '../../services/student'
import {fetchStudents, createSetLoadingAction,createSetUsersAction} from '../action/usersAction'

// 自动增加和停止的流程控制
function* autoTsk(){
  while(true){
    yield take(actionTypes.autoIncrease) // 只监听autoIncrease
    yield race({
      autoIncrease: call(function* (){
        while(true){
          yield delay(2000)
          yield put(increase())
        }
      }),
      cancel: take(actionTypes.stopAutoIncrease)
    })
  }
}

export default function* (){
    yield fork(autoTsk)
    console.log('正在监听asyncIncrease、asyncDecrease')
}
