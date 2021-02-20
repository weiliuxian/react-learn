import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
// /a
function A(props){
  return <div>
    <p>新闻：</p>
  </div>
}

export default function App(){
  return (
    <Router>
      <Switch>
        <Route path="/news/:year(\d+)/:month(\d+)/:day(\d+)/*" component={A}/>
      </Switch>
    </Router>
  )
}