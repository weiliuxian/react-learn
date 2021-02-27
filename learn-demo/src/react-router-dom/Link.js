import React from 'react'
import ctx from '../react-router/RouterContext'
import {parseLocation} from './utils'
import {parsePath} from 'history'

export default function Link(props) {

  

  return (
    <ctx.Consumer>
      {
        value => {
          let loc
          if(typeof props.to === 'object'){
            loc = props.to
          }
          else {
            loc = parsePath(props.to)
          }
          const href = value.history.createHref(loc)
          return <a href={href} onClick={e => {
            e.preventDefault();
            value.history.push(loc)
          }}>
                  {props.children}
                </a>
          
        }
      }
    </ctx.Consumer>
  )
}
