import React from 'react'
import ctx from './RouterContext'

export default function withRouter(Comp) {
  class routerWrapper extends React.Component {
    render() {
      return <ctx.Consumer>
        {
          value => {
            return <Comp {...this.props} {...value} />
          }
        }
      </ctx.Consumer>
    }
  }
  routerWrapper.displyName = `withRouter${Comp.displyName||Comp.name}`
  return routerWrapper
}
