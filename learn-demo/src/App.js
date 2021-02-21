import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
// /a
function PageA(props){
  return <div>
    PageA
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