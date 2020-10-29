/**
 * ************************************
 *
 * @module WelcomeScreen.jsx
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Renders the display component for welcoming the signed-in user
 *
 * ************************************
 */

import React from 'react';
import * as projectStates from '../constants/projectStates';

const WelcomeScreen = (props) => {
  const { updateProjectState } = props;
  return (
    <div id="canvas-container">
      <div id="welcome">
        <p id="welcome-label">Welcome!</p>
        <button
          type="button"
          id="new-project-btn"
          onClick={() => {
            updateProjectState(projectStates.CREATING_NEW);
          }}
        >
          Create A New Project
        </button>
        <button type="button" id="load-project-btn">
          Load An Existing Project
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
