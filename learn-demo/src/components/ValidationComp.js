import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ValidationComp extends Component {
    // 先混合属性
    static defaultProps = {
        b: true
    }
    static propTypes = {
        a: PropTypes.number.isRequired,   //a属性必须是一个数字并且必填
        b: PropTypes.bool.isRequired,
        onClick: PropTypes.func,
        c: PropTypes.any.isRequired, // 1、可以设置必填  2、列出所有属性（不明确类的属性也列出来，可以看到完整属性）
        d: PropTypes.node.isRequired,
        children: PropTypes.element, 
        F: PropTypes.elementType, // 组件类型
        g: PropTypes.arrayOf(PropTypes.number), //必须是数字数组
        h: PropTypes.objectOf(PropTypes.number), //对象的所有属性值必须都是数字
        i: PropTypes.shape({     // 属性必须满足该对象的要求
            name: PropTypes.string.isRequired,
            age: PropTypes.number,
            address: PropTypes.shape({
                city: PropTypes.string
            })
        }),
        k: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            age: PropTypes.number
        })),
        m: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
        n: function(props,propsName,componentName){
            // 必填,必须是一个数字，并且取值范围是0~100
            const val = props[propsName];
            if(val === undefined || val === null){
                return new Error(`invalid prop ${propsName} in ${componentName},${propsName} is required`)
            }

            if(typeof val === 'number'){
                return new Error(`invalid prop ${propsName} in ${componentName},${propsName} is not a number`)
            }

            if(val < 0 || val > 100){
                return new Error(`invalid prop ${propsName} in ${componentName},${propsName} is between 0 to 100`)
            }
        }
    }
    render() {
        const F = this.props.F
        return (
            <div>
                {this.props.a} {this.props.d} {<F />} {this.props.i.age}
            </div>
        )
    }
}
