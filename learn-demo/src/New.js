import React from 'react'
import {Link} from 'react-router-dom'

export default function New(props) {
  return (
    <div>
      <nav>
        <Link to="">新闻首页</Link>
        <Link to="">新闻详情页</Link>
        <Link to="">新闻搜索页</Link>
      </nav>
      <div>
        {/* 匹配的页面 */}
        {this.props.children}
      </div>
    </div>
  )
}
