import './Game.css';
import Trash from './Trash';
import GameCol from './GameCol';
import Include from './Include';
import Controls from './Controls';
import BackToMain from '../NavComponents/BackToMain';
import React from 'react';
import API from '../utils/API';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import iconAccepted from '../icons/accept.png';
import iconRejected from '../icons/cancel.png';
const imgFolder = require.context('../images/', true);

class  Game extends React.Component {
  state = {
    //Player Variables
    playerPosition: 0,
    playerPositionArray: [0, 60, 160, 260, 325],
    playerLocation: 0,

    //Drop Variables
    dropTags: [],
    dropCount: 0,
    dropTime: 1,
    dropInterval: 4,
    dropTagsAmmount: 0,

    //Tag Variables
    tags: [],
    tagWords: [["", "", "", "", ""],["", "", "", "", ""],["", "", "", "", ""]],
    heldTag: "",
    acceptedTags: [],
    rejectedTags: [],
    tagInput: '',
    tagConfirmation: undefined,

    //Image Variables
    imageID: null,

    finished: false,
  }

  moveLeft = (e) => {
    if(this.state.playerPosition > 0) {
      this.state.playerPosition--;
      this.state.playerLocation = this.state.playerPositionArray[this.state.playerPosition];
      document.getElementById("Player").style.left = this.state.playerLocation + "px";
      if(this.state.playerPosition === 0) {
        $('#drop-button').text('Reject');
      } else if (this.state.playerPosition < 4) {
        $('#drop-button').text('Drop');
      }
    }
  }

  moveRight = (e) => {
    if(this.state.playerPosition < this.state.playerPositionArray.length-1) {
      this.state.playerPosition++;
      this.state.playerLocation = this.state.playerPositionArray[this.state.playerPosition];
      if(this.state.playerPosition === 4) {
        $('#drop-button').text('Accept');
      } else if (this.state.playerPosition > 0) {
        $('#drop-button').text('Drop');
      }
      document.getElementById("Player").style.left = this.state.playerLocation + "px";
    }
  }

  pickUpTag = (e) => {
    if(0 < this.state.playerPosition && this.state.playerPosition < 4 && this.state.heldTag === "") {
      var column = this.state.playerPosition-1;
      if(this.state.tagWords[column][4] !== "") {
        this.setState({heldTag: this.state.tagWords[column][4]},  
          () => {
            this.state.tagWords[column][4]="";
            this.setState({tagWords: this.state.tagWords});
            $('.HeldTag').css({'min-width':'75px', 'background-image':'none', 'height': '0px', 'top': '-25px'});
          });
      };
    }
  }

  dropTag = (e) => {
    if(this.state.heldTag === "") {
      return;
    }
    if(this.state.playerPosition === 0) { //Reject Tag
      //Add to Reject array
      let rejectedTagsAdded = this.state.rejectedTags;
      rejectedTagsAdded.push(this.state.heldTag);
      this.setState({heldTag: "", rejectedTags: rejectedTagsAdded});
      $('.HeldTag').css('min-width', '0px');
      this.changeHeldTagIcon(iconRejected);
    } else if (this.state.playerPosition === 4) { //Accept Tag
      //Add to Accept Array
      let acceptedTagsAdded = this.state.acceptedTags;
      acceptedTagsAdded.push(this.state.heldTag);
      this.setState({heldTag: "", acceptedTags: acceptedTagsAdded});
      $('.HeldTag').css('min-width', '0px');
      this.changeHeldTagIcon(iconAccepted);
    }
  }

  changeHeldTagIcon = (newIcon) => {
    if(typeof this.state.iconTimerID === 'number') {
      clearTimeout(this.state.iconTimerID);
      this.setState({ iconTimerID: undefined });
    }
    $('.HeldTag').css({'background-image':`url(${newIcon})`, 'height':'50px', 'width':'50px', 'top': '-5px'});
    let iconTimerID = setTimeout(() => {
      $('.HeldTag').css({'background-image':`none`, 'height':'0px', 'width':'0px'});
      this.setState({ iconTimerID: undefined });
    }, 2000);
    this.setState({ iconTimerID: iconTimerID });
  }

  keyDown = (e) => {
    // console.log(e.keyCode);
    if(this.state.finished) return;
    if(e.key === 'a' || e.keyCode === 37) {
      this.moveLeft(e);
    } else if (e.key === 'd' || e.keyCode === 39) {
      this.moveRight(e);
    } else if (e.key === 's'|| e.keyCode === 40) {
      this.dropTag(e);
    } else if (e.key === 'w'|| e.keyCode === 38) {
      this.pickUpTag(e);
    }
  }

  componentWillMount() {
    let gameID = window.location.pathname.split('/')[2];
    if(gameID) {
      API.getTags(gameID).then(results => {
        let shuffledTags = this.shuffle(results.data);
        let tagArr = [];
        let tagLimit = 20;
        for(let i=0; i<shuffledTags.length; i++) {
          tagArr.push(shuffledTags[i].tag);
          if(tagLimit>0 && i>=tagLimit-1) break;
        }
        // console.log('tagArr', tagArr);
        this.setState({dropTags: tagArr, dropTagsAmmount: tagArr.length});
      });

      API.getImages().then(results =>{
        console.log('Game ID: ', gameID);
        for(let i=0; i<results.data.length; i++) {
          // console.log(results.data[i]);
          if(results.data[i].image_id == gameID) {
            var imageSrc = imgFolder(`./${results.data[i].image_file_name}`);
            this.setState({finished: false});
            // console.log('imagSrc', imageSrc);
            $('#Game').css('background-image', `url(${imageSrc.default})`);
            $('#viewImageSrc').attr("src", imageSrc.default);
            break;
          }
          if(i<=30) break; //Limit images to first 30
        }
      });
    }
    this.setState({imageID: gameID})
    window.addEventListener('keydown', this.keyDown);
    this.frameTime(2000);
  }

  frameTime = (interval) => {
    if(!interval) interval = 1000;
    this.state.dropIntervalID = setInterval(() => {
      //Drop Tag Timer
      this.moveTagsDown();

      //Check for end game conditions
      if (this.state.dropCount >= this.state.dropTags.length && this.state.heldTag === "") {
        let finished = true;
        for(let t=0; t<this.state.tagWords.length; t++) {
          for(let i=0; i<this.state.tagWords[t].length; i++) {
            if(this.state.tagWords[t][i] !== "") {
              finished = false;
              break;
            }
          }
          if(!finished) break;
        }
        if(finished) {
          console.log('finished');
          $('#returnToMain').css('display', 'none');
          $('#finished').css('display', 'block');
          this.setState({finished: true})
          clearInterval(this.state.dropIntervalID);
          this.incrementAcceptedTags();
          this.incrementRejectedTags();
        }
      }
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

  incrementAcceptedTags = () => {
    if(this.state.imageID && this.state.acceptedTags.length > 0) {
      let data = {image_id: this.state.imageID, tag: this.state.acceptedTags}
      API.incrementAccepted(data).then(results => {});
    } else {
      console.log("Error: Missing Tag Increcrement requirements.", this.state.imageID, this.state.acceptedTags);
    }
  }

  incrementRejectedTags = () => {
    if(this.state.imageID && this.state.rejectedTags.length > 0) {
      let data = {image_id: this.state.imageID, tag: this.state.rejectedTags}
      API.incrementRejected(data).then(results => {});
    } else {
      console.log("Error: Missing Tag Increcrement requirements.", this.state.imageID, this.state.rejectedTags);
    }
  }

  addNewUserTag = (e) => {
    e.preventDefault();
    // console.log(this.state.tagInput);
    let data = {image_id: this.state.imageID, tag: this.state.tagInput};
    API.createUserTag(data).then(results => {
      let data = JSON.parse(results.config.data);
      this.setState({tagConfirmation: data.tag});
      $('#newTagConfirmation').css("display", "block");
    });
  }

  handleTagInputChange = (e) => {
    this.setState({tagInput: e.target.value});
  }

  viewImageOpen = () => {
    $("#viewImage").css("display", "block");
  }

  viewImageClose = () => {
    $("#viewImage").css("display", "none");
  }

  render() {
    
    return (
      <div className="Game" id="Game">
        <BackToMain game={true} finished={this.state.finished}/>
        <div className="model" id="finished">
          <h2>Thank you for playing. Now add your voice!</h2>
          <p>In the box, add words or phrases you would use to describe this image. Please add tags one at a time</p>
          <p id="newTagConfirmation" style={{display:"none"}}>Your added tag: {this.state.tagConfirmation}</p>
          <form className="form" onSubmit={this.addNewUserTag}>
            <input type="text" value={this.state.tagInput} onChange={this.handleTagInputChange}></input>
            <input className="form-button" type="submit" value="Submit"></input>
          </form>
          <div className="button" onClick={this.viewImageOpen}>View Image</div>
          <Link className="button" to="/">Return to Main Menu</Link>
        </div>
        <div className="model" id="viewImage">
          <div className="model-close" onClick={this.viewImageClose}>x</div>
          <img id="viewImageSrc" src="" alt="View Image"/>
        </div>
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