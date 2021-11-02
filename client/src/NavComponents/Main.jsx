import React from "react";
import API from "../utils/API";
import "./Main.css";
import { Link } from "react-router-dom";
const imgFolder = require.context('../images/', true);

class Main extends React.Component {
  state = {
    images: [],
    gameID: null,
  };

  componentWillMount() {
    API.getImages().then(results => {
      this.setState({images: results.data});
    });
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Meta Tag Game</h1>
        <Link to='/about'><h2>About the Game</h2></Link>
        <p className='main-description'>Help the Adler Planetarium tag our collections to expand how we describe our objects, and how people like you can find them!</p>
        <h3>Instructions</h3>
        <p className='main-instructions'>Control your character using w, a, s, d keys, arrow keys, or the buttons at the bottom of the screen. Catch the falling words when they reach your character (either using the up arrow, "w," or pickup buttons) and then drop them (using the down arrow, "s," or dropoff buttons) on the far right if <strong>you</strong> think they match the image, or on the far left if they do not match the image.</p>
        <div id="tagImages">
          {this.state.images.map((image) => {
            var imageSrc = imgFolder(`./${image.image_file_name}`);
            return(
              <Link key={image.image_id} to={`/game/${image.image_id}`}>
                <div className="game-images">
                  <h3 className="game-title">Play Level</h3>
                  <img src={imageSrc.default} alt={image.image_file_name}/>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Main;