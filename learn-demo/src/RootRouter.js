import React from 'react'
import {Route} from 'react-router-dom'
import routeConfigs from './routeConfigs'
/**
 * 根据路由配置数组，遍历该数组，得到一组Route组件
 * @param {} routes 
 */
function getRoutes(routes){
  return routes.map((rt,i) => (
    <Route key={i} {...rt} />
  ))
}

/**
 * 使用Route组件，根据不同的路径，渲染顶级页面
 */
export default function RootRouter(){
  return (
    <>
      {/* <Route path="/" exact component={Home} />
      <Route path="/news" exact component={New} /> */}
      {getRoutes(routeConfigs)}
    </>
  )
}