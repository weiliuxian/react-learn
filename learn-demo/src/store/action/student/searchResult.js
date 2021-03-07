import {searchStudents} from '../../../services/student'


export const actionTypes = {
  setStudentAndTotal: Symbol('setStudentAndTotal'),
  setIsLoading: Symbol('setIsLoading')
}

/**
 * 得到一个设置学生数组和总数的action
 * @param {*} arr 
 * @param {*} total 
 * @returns 
 */
export function setStudentAndTotal(arr, total){
  return {
    type: actionTypes.setStudentAndTotal,
    payload: {
      datas: arr,
      total
    }
  }
}

export function setIsLoading(isLoading){
  return {
    type: actionTypes.setIsLoading,
    payload: isLoading
  }
}

/**
 * 根据当前仓库中的查询条件查询学生
 */
export function fetchStudents(){  
  return async function(dispacth, getState){
    dispacth(setIsLoading(true))
    const params = getState().student.searchCondition
    const result = await searchStudents(getState(params))
    dispacth(setStudentAndTotal(result.datas, result.cont))
    dispacth(setIsLoading(false))
  }
}