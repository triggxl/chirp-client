import React from 'react';
import chirpContext from '../../chirp-context/chirpContext';
import { Link } from 'react-router-dom';
import ColorfulParrots from '../pictures/colorful-parrots.jpg'
import OldTelephone from '../pictures/old-telephones.jpg'
import Typewriter from '../pictures/typerwriter.jpg'
import SiteButton from '../site-button'
import './landing-page.css';

const landingPage = () => {
  return (
    <chirpContext.Consumer>
      {(context) => {
        return (
          <div id="landing-page-container">
            <div className="container">
              <div id="content-slider">
                <div id="slider">
                  <div id="mask">
                    <img className="parrots" src={ColorfulParrots} alt="vivid parrots up close in the wild" />
                    <img className="rotary" src={OldTelephone} alt="three old rotary phones lined up against a wall" />
                    <img className="typewriter" src={Typewriter} alt="Old typewriter" />
                  </div>
                  <div className="progress-bar"></div>
                </div>
              </div>
            </div>
            <h1 id="site-title">Welcome to Chirp-(En-Passant)!</h1>
            <h2>(An online discussion board)</h2>
            <Link to="/message-board"><SiteButton style={{ fontSize: ".9em" }}>Let's Get Started!</SiteButton></Link>
          </div>
        )
      }}
    </chirpContext.Consumer>
  )
}

export default landingPage;