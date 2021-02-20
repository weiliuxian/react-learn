import React, { Component } from 'react';
import './index.css';
import Proptypes from 'prop-types'

class Layout extends Component {
  static propTypes = {
    header: Proptypes.element,
    aside: Proptypes.element,
    children: Proptypes.element
  }
  render() {
    return (
      <div className="container">
        <header className="header">
          {this.props.header}
        </header>
        <div className="middle">
          <aside className="aside">
            {this.props.aside}
          </aside>
          <div className="main">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;