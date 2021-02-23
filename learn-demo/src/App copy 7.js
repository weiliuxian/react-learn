import React from 'react'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import * as Pages from './pages'
import './App.css'
import TransitionRoute from './TransitionRoute'

export default function App(){
  return (
    <div className="main">
      <Router>
        <Pages.NavBar />
        <div className="page-container">
          <TransitionRoute  path="/" exact component={Pages.Home} />
          <TransitionRoute path="/news" component={Pages.News} />
          <TransitionRoute path="/personal" component={Pages.Personal} />
        </div>
      </Router>
    </div>
  )
}