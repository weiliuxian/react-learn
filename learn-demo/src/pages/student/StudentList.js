import React,{useState,useEffect} from 'react'
import StudentSearch from '../../components/StudentSearch'
import StudentTable from '../../components/StudentTable'
import {searchStudents} from '../../services/student'
import Pager from '../../components/common/Pager'
import qs from 'query-string'


// 该函数用于获取地址栏参数中提供的查询条件，返回一个对象，如果某个条件地址中缺失，使用默认值
function getQuery(search){
  const def = {
    page: 1,
    limit: 10,
    key: '',
    sex: -1
  }
  let query = qs.parse(search)
  query = Object.assign({},def,query)
  query.limit = +query.limit
  query.page = +query.page
  query.sex = +query.sex
  return query
}

/**
 * 获取服务器的响应结果
 */
function useResp(query){
  const [resp,setResp] = useState({cont: 0,datas: []})
  useEffect(()=>{
    searchStudents({
      limit: query.limit,
      page: query.page,
      key: query.key,
      sex: query.sex
    }).then(res => {
      setResp(res)
    })
  },[query.limit,query.page,query.key,query.sex])
  return resp
}

function changeLocation(query,history){
  // 根据条件对象，改变地址
  const search = qs.stringify(query)
  history.push('?'+search)  // 当前页面添加或者更改参数,直接问号拼接,更改地址，就是更改了router提供的上下文，会导致重新渲染页面  
}

export default function StudentList(props) {
  const query = getQuery(props.location.search)
  const resp = useResp(query)
  return (
    <div>
      <StudentSearch
        defaultValue={{key: query.key,sex: query.sex}}
        onSearch={val => {
          const newQuery = {
            ...query,
            key: val.key,
            sex: val.sex,
            page: 1
          }
          changeLocation(newQuery,props.history)
        }}  />
      <StudentTable stus={resp.datas}/>
      <div>
        <Pager current={query.page} total={resp.cont} limit={query.limit} panelNumber={5} onPageChange={newPage => {
          const newQuery = {
            ...query,
            page: newPage
          }
          changeLocation(newQuery,props.history)
        }} />
      </div>
    </div>
  )
}
