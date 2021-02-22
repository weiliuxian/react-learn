import React from 'react'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import routeConfig from './RouteConfig'
// /a
function User({match}){
  const pPath = match.url
  return <div>
    <h1>User固定区域</h1>
    <p>
    <Link to={routeConfig.user.update}>用户信息</Link>
    <Link to={routeConfig.user.pay.root}>充值</Link>
    </p>
    <div style={{
      width:500,
      height:500,
      border: '2px solid',
      margin: 'o auto'
    }}>
      <Route path={routeConfig.user.update} component={UserUpdate} />
      <Route path={routeConfig.user.pay.root} component={UserPay} />
    </div>
  </div>
}

function UserUpdate(){
  return <h1>修改用户信息</h1>
}

function UserPay(){
  return <h1>用户支付页面</h1>
}

export default function App(){
  return (
    <Router>
      <Route path={routeConfig.root} component={User}/>
    </Router>
  )
}