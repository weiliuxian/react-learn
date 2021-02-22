import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import loginInfo from './loginInfo'
export default function ProtectedRoute({component:Component,children,render,...rest}) {
  return (
    <Route {...rest} render={values => {
      if(loginInfo.isLogin){
        return <Component />
      }
      else {
        // return <Redirect to={{
        //   pathname: '/login',
        //   search: '?returnurl=/personal'
        // }} />
        return <Redirect to={{
          pathname: '/login',
          state: values.location.pathname
        }} />
      }
    }} />
  )
}
