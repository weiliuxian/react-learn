import React from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom'

// /a
function A(){
  return <h1>组件A</h1>
}
// /a/b
function B(){
  return <h1>组件B</h1>
}
// 任意路径
function C(){
  return <h1>找不到页面</h1>
}

export default function App(){
  return (
    <HashRouter>
      <Switch>
      <Route path="/a/b"  component={B} />
        <Route sensitive={true}  path="/a" component={A}><h2>dfsdfkkkkk</h2></Route>
        
        <Route component={C} />
      </Switch>
     
    </HashRouter>
  )
}