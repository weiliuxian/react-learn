import React from 'react'
import {Route} from 'react-router-dom'
import 'animate.css'
import {CSSTransition} from 'react-transition-group'

export default function TransitionRoute(props) {
    const {component:Component,...rest} = props
    return (
        <Route {...rest}>
            {props => {
                return <CSSTransition
                  in={props.match?true:false}
                  timeout={2000}
                  classNames={{
                    enter: 'animate__animated animate__slow animate__fadeInRight',
                    // enterActive: 'animate__fadeIn',
                    exit: 'animate__animated animate__slow animate__fadeOutLeft',
                    // exitActive: 'animate__fadeOut'
                  }}
                  mountOnEnter={true}
                  unmountOnExit={true}
                >
                  <Component />
                </CSSTransition>
            }}
          </Route>
    )
}
