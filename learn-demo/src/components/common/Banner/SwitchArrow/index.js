import React, { Component } from 'react';
import './index.css'
import PropType from 'prop-types'

class SwicthArrow extends Component {

  static propTypes = {
    onChange: PropType.func
  }
  render() {
    return (
      <div className='arrow'>
        <span className="left" onClick={()=>{
          this.props.onChange && this.props.onChange('left');
        }}>&lt;</span>
        <span className="right" onClick={()=>{
          this.props.onChange && this.props.onChange('right');
        }}>&gt;</span>
      </div>
    );
  }
}

export default SwicthArrow;