import './Controls.css';
import React from 'react';

class Controls extends React.Component {
  render() {
  return (
      <div className="Controls">
        <button className='Left button' onClick={this.props.moveLeft}>Left</button>
        <button className='Right button' onClick={this.props.moveRight}>Right</button>
        <button className='Pickup button' onClick={this.props.pickUpTag}>Pickup</button>
        <button className='Drop button' onClick={this.props.dropTag}>Drop</button>
      </div>
    );
  }
}

export default Controls;