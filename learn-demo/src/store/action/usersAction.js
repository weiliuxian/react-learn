import {getAllStudents} from '../../services/student'

export const ADDUSER = Symbol('add-user')
export const DELETEUSER = Symbol('delete-user')
export const UPDATEUSER = Symbol('update-user')
export const SETUSER = Symbol('set-user')
export const SETLOADING = Symbol('set-loading')




export const createAddUserAction = (user) => ({
  type: ADDUSER,
  payload: user
})

export const createDeleteUserAction = (id) => ({
  type: DELETEUSER,
  payload: id
})

export const createUpdateUserAction = (id, newUserData) => ({
  type: UPDATEUSER,
  payload: {
    ...newUserData,
    id
  }
})


export const createSetUsersAction = (users) => {
  return {
    type: SETUSER,
    payload: users //用户数组
  }
}

/**
 * 返回一个设置加载状态的action
 * @returns 
 */
export const createSetLoadingAction = (isLoading) => {
  return {
    type: SETLOADING,
    payload: isLoading //是否正在加载
  }
}

// redux-thunk    action
// export const fetchUsers = () => {
//   // 由于thunk的存在，允许action是一个带有副作用的函数
//   return async (dispatch, getState, extra) => {
//     dispatch(createSetLoadingAction(true))
//     const users = await getAllStudents
//     dispatch(createSetUsersAction(users))
//     dispatch(createSetLoadingAction(false))
//   }
// }

// redux-promise    action
// 由于使用了redux-promise中间件，因此，允许使用action是一个promise，在promise中，如果要触发action,则使用resolve
// export const fetchUsers2 = () => {
//   return new Promise((resolve,reject) => {
//     setTimeout(()=>{
//       const action = createAddUserAction({id: 6786, name: 'dfs', age: 89})
//       resolve(action)
//     },1000)
//   })
// }

// export async function fetchUsers3(){
//   const users = await getAllStudents
//   return createSetUsersAction(users)
// }

// export async function fetchUsers3(){
//   return {
//     type: SETUSER111,
//     payload: getAllStudents().then(resp => ({
//       datas: resp.datas,
//       total: resp.cont
//     }))
//   }
// }

