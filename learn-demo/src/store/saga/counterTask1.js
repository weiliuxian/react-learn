import {take,takeEvery} from 'redux-saga/effects'
import {actionTypes} from '../action/counter'

function* asyncIncrease(){
  console.log('粗发了asyncIncrease')
}
function* asyncDecrease(){
  console.log('asyncDecrease')
}

export default function* (){
  // while(true){
    // const action = yield take(actionTypes.asyncIncrease)
    // console.log('监听到了asyncIncrease', action)
  // }
   yield takeEvery(actionTypes.asyncIncrease, asyncIncrease)
   yield takeEvery(actionTypes.asyncDecrease, asyncDecrease)
    console.log('正在监听asyncIncrease、asyncDecrease')
}