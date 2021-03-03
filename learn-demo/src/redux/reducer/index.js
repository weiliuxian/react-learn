import loginUser from './LoginUser'
import users from './users'

export default (state = {}, action) => {
  const newState = {
    loginUser: loginUser(state.loginUser, action),
    users: users(state.users, action)
  }
  return newState;
}
