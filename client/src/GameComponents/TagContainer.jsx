import './TagContainer.css';
import React from 'react';

class  TagContainer extends React.Component {
  state = {
    id:this.props.id,
  }

  render() {
    return (
        <div className="TagContainer">
          <span>
            <span className="TagWord">{this.props.tagWord}</span>
          </span>
        </div>
      );
    }
  }

export default TagContainer;