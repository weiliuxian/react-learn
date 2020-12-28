import React, { Component } from 'react';
import PropType from 'prop-types';
import './index.css'

class SwitchDot extends Component {
  static propTypes = {
    total: PropType.number.isRequired,
    curIndex: PropType.number.isRequired,
    onChange: PropType.func
  }
  render() {
    console.log(this.props)
    const spans = [];
    for (let index = 0; index < this.props.total; index++) {
      spans.push(<span key={index} className={index === this.props.curIndex? 'active':''} onClick={()=>{
        this.props.onChange && this.props.onChange(index);
      }}></span>)      
    }
    return (
      <div className="dots">
        {spans}
      </div>
    );
  }
}

export default SwitchDot;