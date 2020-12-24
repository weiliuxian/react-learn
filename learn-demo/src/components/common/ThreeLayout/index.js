import React from 'react'
import './index.css'
import types from '../../../utils/commonTypes'
import PropTypes from 'prop-types'

ThreeLayout.defaultProps = {
    leftWidth: 200,
    rightWidth: 200,
    minWidth: 800
}

ThreeLayout.PropTypes = {
    leftWidth: PropTypes.number,
    rightWidth: PropTypes.number,
    minWidth: PropTypes.number,
    gap: PropTypes.number,
    children: types.children,
    left: PropTypes.node,
    right: PropTypes.node
}

export default function ThreeLayout(props) {
    // var defaultProps = {
    //     leftWidth: 200,
    //     rightWidth: 200,
    //     minWidth: 800
    // }

    // const datas = Object.assign({},defaultProps,props);
    return (
        <div className="three-layout" style={{
            minWidth: props.minWidth
        }}>
            <div className="main">
                {props.children}
            </div>
            <div className="aside-left" style={{
                width: props.leftWidth
            }}>
                {props.left}
            </div>
            <div className="aside-right" style={{
                width: props.rightWidth
            }}>
                {props.right}
            </div>
        </div> 
    )
}
