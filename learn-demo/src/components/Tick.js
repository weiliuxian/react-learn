// 计时器，用作倒计时

import React, { Component } from 'react'

export default class Tick extends Component {
     // 初始化状态，js Next语法，目前处于实验阶段
     state = {
        left: this.props.number
    }
    constructor(props){
        super(props);
        // 初始化状态
        // this.state = {
        //     left: this.props.number
        // }
        this.timer = setInterval(()=>{
           
            // this.state.left--;  //不会重新渲染
            // 重新渲染
            this.setState({
                left: this.state.left - 1  //重新设置状态,会触发自动重新渲染
            })

            if(this.state.left === 0){
                clearInterval(this.timer);
                props.onOver && props.onOver();
            }

        },1000)
    }

    render() {
        return (
            <h1>
                倒计时剩余时间：{this.state.left}
            </h1>
        )
    }
}

