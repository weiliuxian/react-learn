export const SETLOGINUSERTYPE =  Symbol('set-login-user')  // 定义type属性的属性名，方便以后更改

/**
 * 设置登录用户的action
 * @param {*} user 
 */
export function createSetLoginUserAction(user){
  return {
    type: SETLOGINUSERTYPE,
    payload: user
  }
}