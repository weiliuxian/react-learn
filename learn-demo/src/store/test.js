import store from './index'
import {change} from './action/student/searchCondition'
import {setIsLoading,setStudentAndTotal, fetchStudents} from './action/student/searchResult'

store.dispatch(setIsLoading(true))
store.dispatch(change({key: '123', sex: 1}))
store.dispatch(fetchStudents())

