import {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Prompt extends Component {
    static defaultProps = {
        when: false, //当when为false的时候，添加阻塞
        message: '' //阻塞时提示消息
    }

    componentDidMount(){
        this.handleBlock()
    }
    componentDidUpdate(){
        this.handleBlock()
    }
    componentWillUnmount(){
        this.handleBlock()
    }
    handleBlock(){
        if(this.props.when){
            this.unBlock = this.props.history.block(this.props.message)
        }else {
            if(this.unBlock){
                this.unBlock()
            }
        }
    }
    render() {
        return null
    }
}