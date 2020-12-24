import React, { Component } from 'react'

export default class NumberInput extends Component {
    state = {
        val: '',
        checked: true,
        loves: ['足球','篮球','音乐'],
        chooseLoves:[]
    }
    render() {
        const checkboxList = this.state.loves.map(it => (<label key={it}>{it}
        <input type="checkbox" checked={this.state.chooseLoves.includes(it)} onChange={e => {
                if(e.target.checked){
                    this.setState({
                        chooseLoves: [...this.state.chooseLoves,it]
                    })
                }else {
                    this.setState({
                        chooseLoves: this.state.chooseLoves.filter(l => l !== it)
                    })
                }
            }
        } /></label>))
        return (
            <div>
                <input type="text" value={this.state.val} onChange={e => {
                    var val = e.target.value;
                    val = val.replace(/\D/g,'');
                    this.setState({
                        val: val
                    })
                }}/ >

                <input type="checkbox" checked={this.state.checked} onChange={ e => {
                    this.setState({
                        checked: e.target.checked
                    })
                }}/> 

                <p>{checkboxList}</p>
                <button onClick={() => {console.log(this.state.chooseLoves)}}>获取选中的值</button>
            </div>
        )
    }
}
