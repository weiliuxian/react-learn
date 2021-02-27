import React from 'react'
// import {BrowserRouter as Router, Route} from 'react-router-dom'
import {BrowserRouter, Route, Switch} from './react-router-dom'

function Page1(params) {
  return <h1>page1</h1>
}
function Page2(params) {
  return <h1>page2</h1>
}

export default function App(){
  return (
    <BrowserRouter>
    <Switch>
      <Route path='/page1' component={Page1} />
      <Route path='/page2' component={Page2}  />
      </Switch>
    </BrowserRouter>
  )
}