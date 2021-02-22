import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import RootRouter from './RootRouter'
import Link from './BetterLink'

export default function App(){
  return (
    <Router>
     <nav>
       <Link to={{name: 'home'}}>首页</Link>
       <Link to={{name: 'news'}}>新闻页</Link>
     </nav>
     <div>
       {/* 放置匹配的页面 */}
       <RootRouter />
     </div>
    </Router>
  )
}