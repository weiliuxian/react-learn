import store from './index'
// import {createSetUsersAction, createSetLoadingAction, fetchUsers} from './action/usersAction'
import {v1 as uuid} from 'uuid'
// import {getAllStudents} from '../services/student'
import {increase,decrease, asyncIncrease, asyncDecrease} from './action/counter'

window.increase = function(){
  store.dispatch(increase())
}

window.decrease = function(){
  store.dispatch(decrease())
}

window.asyncIncrease = function(){
  store.dispatch(asyncIncrease())
}

window.asyncDecrease = function(){
  store.dispatch(asyncDecrease())
}
// store.dispatch(fetchUsers())
// getAllStudents().then(res=>{
//   const action = createSetUsersAction(res)
//   store.dispatch(action)
//   store.dispatch(createSetLoadingAction(false))
// })



