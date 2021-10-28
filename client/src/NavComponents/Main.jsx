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