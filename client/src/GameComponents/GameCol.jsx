import './GameCol.css';
import TagContainer from './TagContainer';
import React from 'react';

class GameCol extends React.Component {
  state = {
    id:this.props.id,
  }

  moveTagDown = {}

  render() {
   return(
    <div id={this.state.id} className="GameCol">
      <TagContainer tagWord={this.props.tagWords[0]} />
      <TagContainer tagWord={this.props.tagWords[1]} />
      <TagContainer tagWord={this.props.tagWords[2]} />
      <TagContainer tagWord={this.props.tagWords[3]} />
      <TagContainer tagWord={this.props.tagWords[4]} />
    </div>
    );
  }
}

export default GameCol;