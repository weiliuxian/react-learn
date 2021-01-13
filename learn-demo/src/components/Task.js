import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Task.css'
// import {ObjectEqual } from '../utils/helper'

function Task(props){
    return (
        <li className={props.isFinish ? "finish" : ''}>
            {props.name}                
        </li>
    )

}

Task.propTypes = {
    name: PropTypes.string.isRequired,  //任务名称
    isFinish: PropTypes.bool.isRequired //任务是否完成
}

export default React.memo(Task);

// export default class Task extends PureComponent {
//     static propTypes = {
//         name: PropTypes.string.isRequired,  //任务名称
//         isFinish: PropTypes.bool.isRequired //任务是否完成
//     }
//     // shouldComponentUpdate(nextProps,nextState){
//     //     if(ObjectEqual(this.props,nextProps) && ObjectEqual(this.state,nextState)){
//     //         return false;
//     //     }
//     //     return true;
//     // }
//     render() {
//         return (
//             <li className={this.props.isFinish ? "finish" : ''}>
//                 {this.props.name}                
//             </li>
//         )
//     }
// }
