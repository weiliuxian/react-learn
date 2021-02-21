import React, { Component } from 'react'

export default class StudentSearch extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
        const def = {
            key: '',
            sex: -1
        }
        this.state = Object.assign({},def,this.props.defaultValue)
    }
    handleRadioChange = e => {
        this.setState({
            sex: parseInt(e.target.value)
        })
    }
    handleSearch = () => {
        if(this.props.onSearch){
            this.props.onSearch(this.state)
        }
    }
    render() {
        return (
            <div>
                <p>关键字：<input type="text" value={this.state.key} onChange={e => this.setState({key: e.target.value})}/></p>
                <p>性别：<label><input checked={this.state.sex === -1} onChange={this.handleRadioChange} type="radio" name="sex" value={-1}/>不限</label>
                         <label><input checked={this.state.sex === 0} onChange={this.handleRadioChange} type="radio" name="sex" value={0}/>男</label>
                        <label><input  checked={this.state.sex === 1} onChange={this.handleRadioChange} type="radio" name="sex" value={1}/>女</label>
                </p>
                <button onClick={this.handleSearch}>查询</button>
            </div>
        )
    }
}
