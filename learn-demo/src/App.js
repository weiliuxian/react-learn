import React from 'react'
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'
import RootRouter from './RootRouter'

export default function App(){
  return (
    <Router>
     <nav>
       <Link to="">首页</Link>
       <Link to="">新闻页</Link>
     </nav>
     <div>
       {/* 放置匹配的页面 */}
       <RootRouter />
     </div>
    </Router>
  )
}