import React from 'react'
import {Route,Link} from 'react-router-dom'
import RouteGuard from './RouteGuard'

function  Page1(params) {
  return <h1>Page1</h1>
}
function  Page2(params) {
  return <h1>Page2</h1>
}

export default function App(){
  return (
    <RouteGuard
      onBeforeChange={(preLocation, location, action, callback, unBlock) => {
        console.log(`页面想要从${preLocation.pathname}跳转到${location.pathname},允许跳转`)
        callback(true)
      }}
      onChange={(prevLocation,location,action,unListen) => {
        console.log(`日志：从${prevLocation.pathname}进入页面${location.pathname},进入方式${action}`)
      }}
    >
      <nav>
        <Link to='/page1'>页面1</Link>
        <Link to='/page2'>页面2</Link>
      </nav>
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
    </RouteGuard>
  )
}