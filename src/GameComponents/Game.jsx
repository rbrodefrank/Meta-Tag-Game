import './Game.css';
import Trash from './Trash';
import GameCol from './GameCol';
import Include from './Include';
import Controls from './Controls';
import React from 'react';

class  Game extends React.Component {
  state = {
    playerPosition: 0,
    playerPositionArray: [15, 62, 162, 262, 335],
    playerLocation: 15,
  }

  moveLeft = (e) => {
    e.preventDefault();
    console.log('Move left.');

    if(this.state.playerPosition > 0) {
      this.state.playerPosition--;

      this.state.playerLocation = this.state.playerPositionArray[this.state.playerPosition];
      document.getElementById("Player").style.left = this.state.playerLocation + "px";
    }

    console.log(this.state.playerLocation);
  }

  moveRight = (e) => {
    e.preventDefault();
    console.log('Move right.');

    if(this.state.playerPosition < this.state.playerPositionArray.length-1) {
      this.state.playerPosition++;

      this.state.playerLocation = this.state.playerPositionArray[this.state.playerPosition];
      document.getElementById("Player").style.left = this.state.playerLocation + "px";
    }

    console.log(this.state.playerLocation);
  }

  keyPress = (e) => {
    console.log(e.key);
    if(e.key === 'a') {
      this.moveLeft(e);
    } else if (e.key === 'd') {
      this.moveRight(e);
    }
  }

  componentDidMount() {
    window.addEventListener('keypress', this.keyPress);
  }

  render() {
    return (
      <div className="Game">
        <div className="GameScreen">
          <Trash />
          <GameCol />
          <GameCol />
          <GameCol />
          <Include />
        </div>
        <div id="Player"></div>
        <Controls playerPosition={this.state.playerPosition} playerPositionArray={this.state.playerPositionArray}
         moveLeft={this.moveLeft} moveRight={this.moveRight} />
      </div>
    );
  }
}

export default Game;
