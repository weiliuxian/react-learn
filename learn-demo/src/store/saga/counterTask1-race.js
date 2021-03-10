import { call, cancel, cancelled, delay, fork, put, race, take } from 'redux-saga/effects'
import {actionTypes,increase,decrease, autoIncrease} from '../action/counter'
import {getAllStudents} from '../../services/student'
import {fetchStudents, createSetLoadingAction,createSetUsersAction} from '../action/usersAction'

function asyncAction(){
  // 随机生成1000-5000毫秒的随机时间
  var duration = Math.floor(Math.random()*4000 + 1000)
  return new Promise(resolve => {
    setTimeout(()=>{
      if(Math.random() > 0.5){
        resolve(increase())
      }else {
        resolve(decrease())
      }
    }, duration)
  })
}

export default function* (){
    var result = yield race({
      action1: call(asyncAction()),
      action2: call(asyncAction())

    })
    console.log('result',result)
}
