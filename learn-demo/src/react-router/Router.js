import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ctx from './RouterContext'
import matchPath from './matchPath'

// Router提供上下文，传递history、location、match给子组件

export default class Router extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    children: PropTypes.node
  }
  state = {
    // unListen: () => {},
    location: this.props.history.location  // location需要更新，地址栈中可能有多个location，因此不能像history一样使用同一个对象
  }

  

  componentDidMount(){
    this.unListen = this.props.history.listen((location, action) => {
      this.props.history.action = action;
      this.setState({
        location
      })
    })
  }

  componentWillUnmount(){
    this.unListen();
  }

  render() {
    const ctxValue = {
      history: this.props.history,
      match: matchPath('/', this.state.location.pathname),
      location: this.state.location
    }
   
    return (
      <ctx.Provider value={ctxValue}>
        {this.props.children}
      </ctx.Provider>
    )
  }
}
