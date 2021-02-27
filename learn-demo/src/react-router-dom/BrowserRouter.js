import React from 'react'
import {createBrowserHistory} from './history'
import {Router} from '../react-router'

// 提供history对象，可以在此接收父组件传递的参数，即history的参数
export default class BrowserRouter extends React.Component {

  history = createBrowserHistory(this.props)

  render() {
    return (
      <Router history={this.history}>{this.props.children}</Router>
    )
  }
}