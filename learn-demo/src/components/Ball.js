import React, { Component } from 'react'
import './Ball.css'

export default class Ball extends Component {
    constructor(props){
        super(props);
        // 速度： 每秒移动的像素值
        this.state = {
            left: props.left || 0,
            top: props.top || 0,
            xSpeed: props.xSpeed,
            ySpeed: props.ySpeed,
            bg: props.bg || '#f40'
        }

        const duration = 16;
        
        setInterval(() => {
            // 根据速度改变left和top值
            const xDis = this.state.xSpeed * duration / 1000;
            const yDis = this.state.ySpeed * duration / 1000;
            let newLeft = this.state.left + xDis;
            let newTop =  this.state.top + yDis;

            // 边界情况
            if(newLeft <= 0) {
                newLeft = 0;
                this.setState({
                    xSpeed: -this.state.xSpeed
                })
            }else if(newLeft >= document.documentElement.clientWidth - 100){  //100是自身的宽度
                newLeft = document.documentElement.clientWidth - 100;
                this.setState({
                    xSpeed: -this.state.xSpeed
                })
            }

            if(newTop <= 0) {
                newTop = 0;
                this.setState({
                    ySpeed: -this.state.ySpeed
                })
            }else if(newTop >= document.documentElement.clientHeight - 100){  //100是自身的宽度
                newTop = document.documentElement.clientHeight - 100;
                this.setState({
                    ySpeed: -this.state.ySpeed
                })
            }


            this.setState({
                left: newLeft,
                top: newTop
            })

        },duration)
    }
    render() {
        return (
            <div className="ball" style={{left: this.state.left,top:this.state.top ,background: this.state.bg}}>
                
            </div>
        )
    }
}
