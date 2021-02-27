// 用于匹配路由，并将匹配的结果放入到上下文中

import React, { Component } from 'react'
import ctx from './RouterContext'
import matchPath from './matchPath'

export default class Route extends Component {

  /**
   * path: 路径规则，可以是字符串或者字符串数组
   * children： 无论是否匹配都匹配的子元素
   * render：匹配成功后渲染的子元素
   * component：匹配成功后渲染的组件
   * 
   * 以下是调用matchPath方法时的配置
   * exact
   * strict
   * sensitive
   * 
   */

  static defaultProps = {
    path: '/'
  }

  /**
   * 根据指定的location对象，返回match对象
   * @param {*} location 
   */
  matchRoute(location){
    const {exact = false, strict = false, sensitive = false} = this.props
    return matchPath(this.props.path, location.pathname, {
      exact,
      strict,
      sensitive
    })
  }

  consumerFunc = value => {
    const ctxValue = {
      history: value.history,
      location: value.location,
      macth: this.matchRoute(value.location)
    }
    return <ctx.Provider value={ctxValue}>
      {this.renderChildren(ctxValue)}
    </ctx.Provider>
  }

  renderChildren(ctx){
    const {children, render, component} = this.props
    if(children !== undefined && children !== null){
      if(typeof children === 'function'){
        return children(ctx)
      }else {
        return children
      }
    }
    if(!ctx.macth){
      return null;
    }
    if(typeof render === 'function'){
      return render(ctx)
    } 

    if(component){
      const Component = component
      return < Component {...ctx} />
    }
    return null
  }

  render() {
    return (
      <ctx.Consumer>
        {this.consumerFunc}
      </ctx.Consumer>
    )
  }
}
