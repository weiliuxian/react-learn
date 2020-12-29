import React, { Component } from 'react'
import PropTypes from 'prop-types'

function ChildA(props){
    return  <div>
                <h1>childA</h1>
                <ChildB />
            </div>
}
class ChildB extends React.Component{

    static contextTypes = {
        a: PropTypes.number
    }

    constructor(props,context){
        super(props,context);  // 将上下文交给父类处理
        console.log(this.context);
    }

    render(){
        return <P>ChildB</P>
    }
}
export default class OldContext extends Component {
    static childContextTypes = {
        a: PropTypes.number,
        b: PropTypes.string,
        onChange: PropTypes.func
    }
    getChildContext(){
        return {
            a: 123,
            b: 'sdfd',
            onChange: (newA)=>{
                this.setState({
                    a: newA
                })
            }
        }
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
