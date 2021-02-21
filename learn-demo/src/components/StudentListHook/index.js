import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
/**
 * 学生列表组件
 */
export default function StudentListHook({ stus }) {
  const list = stus.map(item => (
    <li key={item.id}>{item.name}</li>
  ))
  return (
    <ul>
      {list}
    </ul>
  )
}
StudentListHook.defaultProps = {
  stus: []
}
StudentListHook.defaultpropTypes = {
  stus: PropTypes.array.isRequired
}
