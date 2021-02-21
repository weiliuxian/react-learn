import React, { PureComponent } from 'react'

export default class index extends PureComponent {

    state = {
        hasError: false
    }
    static getDerivedStateFromError(error){
        return {
            hasError: true
        }
    }

    componentDidCatch(error,info){
        this.setState({
            hasError: true
        })
    }
    render() {
        if(this.state.hasError){
            return <h1>出现错误了</h1>
        }
        return this.props.children
    }
}
