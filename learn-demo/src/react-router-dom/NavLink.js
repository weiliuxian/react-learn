import React from 'react'
import Link from './Link'
import ctx from '../react-router/RouterContext'
import matchPath from '../react-router/matchPath'
import {parsePath} from 'history'

export default function NavLink(props) {
    const  {
            to,
            activeClass= 'active',
            exact = false, 
            strict = false, 
            sensitive = false,
            ...rest
        } = props
    return (
        <ctx.Consumer>
            {({location}) => {
                let loc;
                if(typeof to === 'string'){
                    loc = parsePath(to)
                }
                const result = matchPath(loc.pathname, location.pathname, {exact, strict, sensitive})
                if(result){
                    return <Link {...rest} className={} />
                }else{
                    return <Link {...rest} />
                }
                
            }}
        </ctx.Consumer>
        
    )
}
