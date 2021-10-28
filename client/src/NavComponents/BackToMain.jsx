import './BackToMain.css';

import React from 'react';
import { Link } from 'react-router-dom';
import BackArrow from '../icons/back-arrow.svg';
import $ from 'jquery';

class BackToMain extends React.Component {
  handleShow = () => {
    if(!this.props.finished) $('#returnToMain').css('display', 'block');
  }

  handleClose = () => {
    $('#returnToMain').css('display', 'none');
  }

  render() {
    if(this.props.game) {
      return (
        <div>
          <div className="toMain" onClick={this.handleShow}>
            <img className="back-arrow" src={BackArrow} alt="Back to Main Menu"/>
          </div>
          <div className="model" id="returnToMain">
            <h2>Are you sure you want to go back to the Main menu?</h2>
            <div className="button" onClick={this.handleClose}>No</div>
            <Link className="button" to='/'>Yes</Link>
          </div>
        </div>
      );
    } else {
      return (
        <Link className="toMain" to='/'>
          <img className="back-arrow" src={BackArrow} alt="Back to Main Menu"/>
        </Link>
      );
    }
  }
}

export default BackToMain;