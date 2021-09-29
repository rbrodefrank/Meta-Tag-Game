import './Game.css';
import Trash from './Trash';
import GameCol from './GameCol';
import Include from './Include';
import Controls from './Controls';
import React from 'react';
import ReactDOM from 'react-dom';

class  Game extends React.Component {
  state = {
    //Player Variables
    playerPosition: 0,
    playerPositionArray: [15, 75, 174, 274, 335],
    playerLocation: 15,

    //Drop Variables
    dropTags: ["1/31/1905", "Alexander von Humboldt", "Berlin", "Bibliothek", "Dominic Colnaghi", "England", "Germany", "Hildebrandt", "library", "London", "Paul Colnaghi", "Portrait", "Storch & Kramer", "Art", "Building", "Collection", "Holy places", "Illustration", "columns", "human figures", "interiors", "stairs", "19th century", "books", "bookshelf", "bookshelves", "boxes", "bust", "busts", "carpet", "chair", "color", "door", "dooway", "drawing", "explorer", "geography", "German", "globe", "home", "house", "ladder", "man", "maps", "office", "painting", "paintings", "reading", "room", "rug", "scientist", "scrolls", "study", "Study Room", "table", "taxidermy", "telescope", "von Humboldt"],
    dropCount: 0,
    dropTime: 0,
    dropInterval: 3,
    dropTagsAmmount: 0,

    //Tag Variables
    tags: [],
    tagWords: [["", "", "", "", "",""],["", "","", "",""],["", "", "","",""]],
    heldTag: "",
    acceptedTags: [],
    rejectedTags: [],

  }

  moveLeft = (e) => {
    e.preventDefault();
    if(this.state.playerPosition > 0) {
      this.state.playerPosition--;
      this.state.playerLocation = this.state.playerPositionArray[this.state.playerPosition];
      document.getElementById("Player").style.left = this.state.playerLocation + "px";
    }
  }

  moveRight = (e) => {
    e.preventDefault();
    if(this.state.playerPosition < this.state.playerPositionArray.length-1) {
      this.state.playerPosition++;
      this.state.playerLocation = this.state.playerPositionArray[this.state.playerPosition];
      document.getElementById("Player").style.left = this.state.playerLocation + "px";
    }
  }

  pickUpTag = (e) => {
    e.preventDefault();
    if(0 < this.state.playerPosition && this.state.playerPosition < 4 && this.state.heldTag === "") {
      var column = this.state.playerPosition-1;
      if(this.state.tagWords[column][4] != "") {
        this.setState({heldTag: this.state.tagWords[column][4]},  
          () => {
            this.state.tagWords[column][4]="";
            this.setState({tagWords: this.state.tagWords});
          });
      };
    }
  }

  dropTag = (e) => {
    e.preventDefault();
    if(this.state.heldTag === "") {
      return;
    }
    if(this.state.playerPosition === 0) { //Reject Tag
      //Add to Reject array
      let rejectedTagsAdded = this.state.rejectedTags;
      rejectedTagsAdded.push(this.state.heldTag);
      this.setState({heldTag: "", rejectedTags: rejectedTagsAdded});
    } else if (this.state.playerPosition === 4) { //Accept Tag
      //Add to Accept Array
      let acceptedTagsAdded = this.state.acceptedTags;
      acceptedTagsAdded.push(this.state.heldTag);
      this.setState({heldTag: "", acceptedTags: acceptedTagsAdded});
    }
  }

  keyPress = (e) => {
    // console.log(e.key);
    if(e.key === 'a') {
      this.moveLeft(e);
    } else if (e.key === 'd') {
      this.moveRight(e);
    } else if (e.key === 's') {
      this.dropTag(e);
    } else if (e.key === 'w') {
      this.pickUpTag(e);
    }
  }

  componentDidMount() {
    let shuffledTags = this.shuffle(this.state.dropTags);
    this.setState({dropTags: shuffledTags, dropTagsAmmount: this.state.dropTags.length});
    window.addEventListener('keypress', this.keyPress);
    this.frameTime(2000);
  }

  frameTime = (interval) => {
    if(!interval) interval = 1000;
    this.state.dropIntervalID = setInterval(() => {
      //Drop Tag Timer
      this.moveTagsDown();
      if (this.state.dropCount >= this.state.dropTags.length) {}
      else if(this.state.dropTime === 0 || (this.state.dropTime < 0 && Number.isInteger(this.state.dropTime))) {
        var randomColumn = Math.floor(Math.random() * 3);
        this.state.tagWords[randomColumn][0] = this.state.dropTags[this.state.dropCount];
        
        this.state.dropCount++;
        this.setState({dropTime: this.state.dropInterval});
      }
      this.setState({dropTime: this.state.dropTime-1});
    }, interval);
  }

  moveTagsDown = () => {
    for(let index=0; index<this.state.tagWords.length; index++){
      for(let i=4; i>0; i--) {
        this.state.tagWords[index][i] = this.state.tagWords[index][i-1];
      }
      this.state.tagWords[index][0] = "";
    }
    this.setState({tagWords: this.state.tagWords})
  }

  shuffle = (array) => { //Fisher-Yates shuffle
    let m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  render() {
    
    return (
      <div className="Game">
        <div className="GameScreen" id="GameScreen">
          <Trash />
          <GameCol id="GameCol1" tagWords={this.state.tagWords[0]}/>
          <GameCol id="GameCol2" tagWords={this.state.tagWords[1]}/>
          <GameCol id="GameCol3" tagWords={this.state.tagWords[2]}/>
          <Include />
          <div id="Player">
            <span className="HeldTag">{this.state.heldTag}</span>
          </div>
          <Controls playerPosition={this.state.playerPosition} playerPositionArray={this.state.playerPositionArray}
         moveLeft={this.moveLeft} moveRight={this.moveRight} pickUpTag={this.pickUpTag} dropTag={this.dropTag} />
        </div>
      </div>
    );
  }
}

export default Game;