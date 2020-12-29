import React, { Component } from 'react';
import './index.css'
import PropTypes from 'prop-types'
import ImgContainer from './ImgContainer/index.js'
import SwitchArrow from './SwitchArrow/index.js'
import SwicthDot from './SwicthDot/index'

class Banner extends Component {

  static defaultProps = {
    width: 520,
    height: 280,
    imgSrcs: [],
    autoDuration: 300,
    duration: 300
  }

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    imgSrcs: PropTypes.arrayOf(PropTypes.string).isRequired,
    autoDuration: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired, //完成一次切换需要的时间

  }
  state = {
    curIndex: 0, //当前显示的是第几张图片
  }

  autoSwicth(){
    // clearInterval(this.timer);
    // this.timer = setInterval(()=>{
    //   let cur = this.state.curIndex;
    //   cur = (cur + 1) % this.props.imgSrcs.length;
    //   this.handleSwitch(cur);
    // },this.props.autoDuration)
  }

  timer = null;
  componentDidMount(){
    // this.autoSwicth();
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }

  imgContainerRef = el => {
    this.imgContainer = el;
  }

  handleArrowChange = type => {
    let cur = this.state.curIndex;
    if(type === 'left'){
      cur--;
      if(cur < 0){
        cur = this.props.imgSrcs.length - 1;
      }

    }else {
      cur++;
      if(cur > this.props.imgSrcs.length -1){
        cur = 0;
      }
    }

    this.handleSwitch(cur);
  }

  handleDotChange = index => {
    this.handleSwitch(index);
  }
  /**
   * 切换到
   * @param {*} index 
   */
  handleSwitch = (index) => {
    this.setState({
      curIndex: index
    })
    this.imgContainer.switchTo(index);
  }

  render() {
    return (
      <div
        className="banner-container"
        style={{
          width: this.props.width,
          height: this.props.height
        }}
        onMouseEnter={()=>{
            clearInterval(this.timer)
          }}
          onMouseLeave={()=>{
            this.autoSwicth();
          }}
        >
        <SwitchArrow onChange={this.handleArrowChange}/>
        <SwicthDot
          total={this.props.imgSrcs.length}
          curIndex={this.state.curIndex}
          onChange={this.handleDotChange}/>
        <ImgContainer
          ref={this.imgContainerRef}
          imgSrcs={this.props.imgSrcs}
          imgWidth={this.props.width}
          imgHeight={this.props.height}
          duration={this.props.duration} />
      </div>
    );
  }
}

export default Banner;