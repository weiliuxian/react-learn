import React from 'react'
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'
import loginInfo from './loginInfo'
import ProtectedRoute from './ProtectedRoute'
import qs from 'query-string'
// /a
function Login(props){
  return <div>
   <button onClick={() => {
     loginInfo.login()
     console.log(props)
     if(props.location.state){
      props.history.push(props.location.state)
     }else {
        props.history.push('/')
      }
    // const query = qs.parse(props.location.search)
    // if(query.returnurl){
    //   props.history.push(query.returnurl)
    // }else {
    //   props.history.push('/')
    // }
    
   }}>登录</button>
  </div>
}

function Home(){
  return <h1>首页</h1>
}

function Personnal(){
  return <h1>个人中心</h1>
}

export default function App(){
  return (
    <Router>
    <div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/login">登录页</Link></li>
        <li><Link to="/personal">个人中心</Link></li>
      </ul>
      <div>
        <Switch>
          <Route path="/login" component={Login}/>
          <ProtectedRoute path="/personal" component={Personnal}/>
          <Route path="/" component={Home}/>
        </Switch>
      </div>
    </div>
    </Router>
  )
}