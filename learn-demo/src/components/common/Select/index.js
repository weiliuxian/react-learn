import React, { Component } from 'react'
import types from '../../../utils/commonTypes'
import PropTypes from 'prop-types'
import withDataList from '../hoc/withDataList'

class Option extends Component {
    static propTypes = {
        info: types.singleData
    }

    render() {
        return (
            <option value={this.props.info.value}>{this.props.info.text}</option>
        )
    }
}
const Options = withDataList(Option)

export default class Select extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func
    }
    render() {
        return (
            <select name={this.props.name} value={this.props.value} onChange={
                (e) => this.props.onChange && this.props.onChange(e.target.value)
            }>
                <Options {...this.props} />
            </select>
        )
    }

}

/**
 * 一组下拉列表
 */
// export default class Select extends Component {

//      // 默认属性
//      static defaultProps = {
//         datas: [],
//         value: []
//     }

//     static propTypes = {
//         datas: types.groupDatas.isRequired,
//         name: PropTypes.string.isRequired,
//         value: types.chooseDatas,
//         onChange: PropTypes.func
//     }

//     handleChange = e => {
//         this.props.onChange && this.props.onChange(e.target.value,this.props.name,e);
//     }

//     /**
//      * 得到一组option
//      */
//     getOptions(){
//         return this.props.datas.map(it => (
//             <option key={it.value} value={it.value}>{it.text}</option>
//         ))
//     }
//     render() {
//         const bs = this.getOptions();
//         return (
//             <select name={this.props.name} value={this.props.value} onChange={this.handleChange}>
//                 {bs}
//             </select>
//         )
//     }
// }
