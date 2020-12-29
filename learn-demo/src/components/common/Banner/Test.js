import React, { Component } from 'react';
import Banner from './index.js'
import img1 from './img/1.jpg';
import img2 from './img/2.jpg';
import img3 from './img/3.jpg';
import img4 from './img/4.jpg';
import img5 from './img/6.jpg';

class Test extends Component {
  render() {
    return (
      <div>
        <Banner imgSrcs={[img1,img2,img3,img4,img5]}/>
      </div>
    );
  }
}

export default Test;