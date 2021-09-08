import './Controls.css';
import React from 'react';

class Controls extends React.Component {
  render() {
  return (
      <div className="Controls">
        <button className='Left button' onKeyPress={this.props.keyPress} onClick={this.props.moveLeft}>Left</button>
        <button className='Right button' onKeyPress={this.props.keyPress} onClick={this.props.moveRight}>Right</button>
        <button className='Pickup button'>Pickup</button>
        <button className='Drop button'>Drop</button>
      </div>
    );
  }
}

export default Controls;