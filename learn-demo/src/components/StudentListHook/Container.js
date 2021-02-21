import React, {useState,useEffect} from 'react'
import StuList from './index'
import {getStudents} from '../../services/student'
import Pager from '../Pager'

export default function Container() {
const [students, setStudents] = useState([])
const [page, setPage] = useState(1)
const [limit, setLimit] = useState(10)
const [total, setTotal] = useState(0)
const [panelNumber, setPanelNumber] = useState(5)
useEffect(()=> {
  (async function(){
    const res = await getStudents(page,limit)
    setStudents(res.findByPage)
    setTotal(res.cont)
  })()
},[page,limit]) //空数组的目的，是让该副作用函数没有任何依赖，从而仅在首次挂载时运行,但是page是变化的，需要依赖
  return (
    <div>
      <StuList stus={students}/>
      <Pager current={page} total={total} limit={limit} panelNumber={panelNumber} onPageChange={newPage => {
        setPage(newPage)
      }}/>
    </div>
  )
}
