import React, { Component } from 'react'
import { withRouter,BrowserRouter as Router} from 'react-router-dom'

let preLocation, location, action, unBlock;

class _GuardHelper extends Component {
    componentDidMount() {
        
        // 设置阻塞（只能设置一个）
        unBlock = this.props.history.block((newLocation, ac)=>{
            preLocation = this.props.location
            location = newLocation
            action = ac
            return ''
        })

        // 添加一个监听器
        this.unListen = this.props.history.listen((location,action) => {
            const prevLocation = this.props.location
            this.props.onChange && this.props.onChange(prevLocation, location, action, this.unListen)
        })

    }
    componentWillUnmount(){
        unBlock()
        this.unListen()
    }

    render() {
        return null
    }
}

const GuardHelper = withRouter(_GuardHelper)

class RouteGuard extends Component {

    handleConfirm = (msg, callback) => {
        if(this.props.onBeforeChange){
            this.props.onBeforeChange(preLocation, location, action, callback, unBlock)
        }else{
            callback(true)
        }
    }
    render() {
        return  <Router getUserConfirmation={this.handleConfirm}>
                    <GuardHelper onChange={this.props.onChange}/>
                    {this.props.children}
                </Router>
    }
}

export default RouteGuard