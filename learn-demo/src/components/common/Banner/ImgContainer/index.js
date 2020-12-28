import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImgContainer extends Component {
  
  static propTypes = {
    imgSrcs: PropTypes.arrayOf(PropTypes.string).isRequired,
    imgWidth: PropTypes.number.isRequired,
    imgHeight: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired
  }

  containerRef = el => {
    this.div = el;
  }

  // 计时器的间隔时间
  tick = 16;

  timer = null;
  /**
   * 切换到第几张图片
   * 调用该函数，此组件会经过一段动画完成切换
   * @param {*} index 图片的下标
   */
  switchTo(index){
    // console.log(this.div,index)
    if(index < 0) {
      index = 0;
    }
    else if(index > this.props.imgSrcs.length -1){
      index = this.props.imgSrcs.length -1;
    }
    // 1、根据index,计算div最终的marginLeft的值
    const targetLeft = -index * this.props.imgWidth;

    // 2、得到当前的marginleft
    let curLeft = parseFloat(getComputedStyle(this.div).marginLeft);

    // 3、计算运动的次数
    const times = Math.ceil(this.props.duration / this.tick);
    let curTimes = 0; // 当前运动的次数

    // 4、计算每次运动的距离
    const totalDis = targetLeft - curLeft; // 总距离
    const dis = totalDis / times; //每次运动的距离

    // 先停止计时器,防止启动多个计时器
    clearInterval(this.timer); 
    this.timer = setInterval(()=>{
      curTimes++;
      curLeft += dis;
      this.div.style.marginLeft = curLeft + 'px';
      if(curTimes === times){
        // 停止运动
        this.div.style.marginLeft = targetLeft  + 'px';
        clearInterval(this.timer);
      }
    },this.tick)

  }

  render() {
    console.log(this.props)
    const imgs = this.props.imgSrcs.map((src,index) => <img src={src} key={index} alt='' style={{
      width: this.props.imgWidth,
      height: this.props.imgHeight,
      float: 'left'
    }} />)
    return (
      <div 
        ref={this.containerRef}
        style={{
        width: this.props.imgWidth * this.props.imgSrcs.length,
        height: this.props.imgHeight
      }}>
        {imgs}
      </div>
    );
  }
}

export default ImgContainer;