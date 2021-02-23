import './page.css'
import React from 'react'
import {NavLink} from 'react-router-dom'
// import {} from 'react-transition-group'

export function NavBar(params) {
    return (
        <div className="header">
            <NavLink to="/" exact>首页</NavLink>
            <NavLink to="/news" exact>新闻页</NavLink>
            <NavLink to="/personal" exact>个人中心</NavLink>
        </div>
    )
}

export function Home(params) {
    return (
        <div className="page home">
            首页
        </div>
    )
}

export function News(params) {
    return (
        <div className="page news">
            新闻页
        </div>
    )
}

export function Personal(params) {
    return (
        <div className="page personal">
            个人中心
        </div>
    )
}