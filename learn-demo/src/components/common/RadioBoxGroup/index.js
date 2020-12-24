import React, { Component } from 'react'
import types from '../../../utils/commonTypes'
import PropTypes from 'prop-types'
import withDataList from '../hoc/withDataList'

class Radio extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        info: types.singleData.isRequired,
        value: PropTypes.string
    }

    render() {
        return (
            <label>
            <input
                type="radio"
                name={this.props.name}
                value={this.props.info.value}
                checked={this.props.value === this.props.info.value}
                onChange={()=> {
                    this.props.onChange && this.props.onChange(this.props.info.value)
                }}
                />
                {this.props.info.text}
        </label>
        )
    }
}

export default withDataList(Radio)

/**
 * 一组单选框
 */
// export default class RadioBoxGroup extends Component {

//       // 默认属性
//       static defaultProps = {
//         datas: [],
//         value: ''
//     }

//     static propTypes = {
//         datas: types.groupDatas.isRequired,
//         name: PropTypes.string.isRequired,
//         value: PropTypes.string.isRequired,
//         onChange: PropTypes.func
//     }

//     handleChange = e => {
//         this.props.onChange && this.props.onChange(e.target.value,this.props.name,e);
//     }

//     /**
//      * 得到一组多选框
//      */
//     getRadioBoxes(){
//         return this.props.datas.map(it => (
//             <label key={it.value}>
//                 <input
//                     type="radio"
//                     name={this.props.name}
//                     value={it.value}
//                     checked={this.props.value === it.value}
//                     onChange={this.handleChange}
//                     />
//                     {it.text}
//             </label>
//         ))
//     }
//     render() {
//         const bs = this.getRadioBoxes();
//         return (
//             <div>
//                 {bs}
//             </div>
//         )
//     }
// }
