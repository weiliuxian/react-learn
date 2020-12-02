import React, { Component } from 'react'

export default class myCpmp extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            number: props.number
        }
        this.timer = setInterval(()=>{
            // this.state.left--;  //不会重新渲染
            // 重新渲染
            this.setState({
                number: this.state.number - 1  //重新设置状态,会触发自动重新渲染
            })

            if(this.state.number === 0){
                clearInterval(this.timer);
            }

        },1000)
    }
    render() {
        return (
            <div>
                倒计时： {this.state.number}
            </div>
        )
    }
}
