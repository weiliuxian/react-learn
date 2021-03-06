import store from './index'
import {createSetUsersAction, createSetLoadingAction} from './action/usersAction'
import {v1 as uuid} from 'uuid'
import {getAllStudents} from '../services/student'

store.dispatch(createSetLoadingAction(true))
getAllStudents().then(res=>{
  const action = createSetUsersAction(res)
  store.dispatch(action)
  store.dispatch(createSetLoadingAction(false))
})



