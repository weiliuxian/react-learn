import loginUser from './LoginUser'
import users from './users'
import {combineReducers} from 'redux'
// import {combineReducers} from 'redux'

// export default (state = {}, action) => {
//   const newState = {
//     loginUser: loginUser(state.loginUser, action),
//     users: users(state.users, action)
//   }
//   return newState;
// }

export default combineReducers({
  loginUser,
  users
})