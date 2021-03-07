
/**
 * 对学生查询条件改变的action类型
 */
export const actionTypes = {
  change: Symbol('change')
}


export function change(newCindition){
  return {
    type: actionTypes.change,
    payload: newCindition
  }
}
