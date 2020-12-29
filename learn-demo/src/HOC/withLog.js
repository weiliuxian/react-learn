import React from 'react'

/**
 * 高阶组件
 * @param {*} Comp 组件
 */
export default function withLog(Comp) {
   class LogWrapper extends React.Component {

        componentDidMount() {
            console.log('aRef',this.props.ref1)
            console.log(`日志： 组件${Comp.name}被创建了，${Date.now()}`)
        }
        componentWillUnmount() {
            console.log(`日志： 组件${Comp.name}被销毁了，${Date.now()}`)
        }

        render() {
            const {ref1,...reset} = this.props
            return <Comp {...reset} ref={ref1} />
        }
    }

    return React.forwardRef((props,ref) => {
        return <LogWrapper {...props} ref1={ref}/>
    })
}