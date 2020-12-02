import React, { Component } from 'react'
import Tick from './Tick'

export default class TickControl extends Component {
    state = {
        isOver: false
    }
    constructor(props){
        super(props);
        // this.handleOver = this.handleOver.bind(this);  //把原型上的方法绑定this返回一个新的函数，新的函数也是在对象上
    }

    // jsnext语法，目前还在实验性阶段，babel可以转义，结果是：handOver该函数不在原型上，而在对象上，这个方法更高效，因为原型上不会生成一样的方法
    handleOver = () => {
        console.log('22',this)
        this.setState({isOver: true})
    }
    // handleOver() {
    //     console.log('22',this)
    //     this.setState({isOver: true})
    // }
    render() {
        let status = '正在倒计时';
        if(this.state.isOver){
            status = '倒计时完成'
        }
        console.log('23333',this);
        return (
            
            <div>
                <Tick onOver={this.handleOver} number={5} />
                <p>
                    {status}
                </p>
            </div>
        )
    }
}
