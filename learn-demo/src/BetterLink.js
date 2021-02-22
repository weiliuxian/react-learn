import React from 'react'
import {Link} from 'react-router-dom'
import routeConfigs from './routeConfigs'

export default function BetterLink({to,...rest}) {
    if(to.name && typeof to !== 'string'){
        to.pathname = getPathFromName(to.name,'/',routeConfigs)
        if(to.pathname === undefined){
            throw new Error(`name属性值${to.name}无效`)
        }
    }
    return (
        <Link {...rest} to={to} />
    )
}

function getPathFromName(name,baseUrl,routesArr){
    for (const item of routesArr) {
        let newPath = baseUrl + item.path
        newPath = newPath.replace(/\/\//g, '/')
        if(item.name === name){
            return newPath
        }else {
            if(Array.isArray(item.children)){
                const path = getPathFromName(name, newPath, item.children)
                if(path !== undefined) {
                    return path
                }
            }
        }
    }
}
