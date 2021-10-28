import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from './NavComponents/Main';
import Game from './GameComponents/Game.jsx';
import About from './NavComponents/About.jsx';
import API from './utils/API';


class App extends Component {
  state = {
    gameID: 0,
    tags:[],
  }

  setGameID = (gameID) => {
    this.setState({gameID: gameID});
  }

  getTags = (gameID) => {
    API.getAllTagInfoByID(gameID).then(results => {
      this.setState({tags: results.data});
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" >
            <Main getTags={this.getTags} />
          </Route>
          <Route path="/game" >
            <Game />
          </Route>
          <Route  path="/about" >
            <About />
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;