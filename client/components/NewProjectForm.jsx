/**
 * ************************************
 *
 * @module NewProjectForm.jsx
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Renders the display component for creating a new project
 *
 * ************************************
 */

import { doc } from 'prettier';
import React from 'react';
import * as projectStates from '../constants/projectStates';

// Image Width
// Image Height
// Create
// Cancel
const NewProjectForm = (props) => {
  const { updateProjectState, updateImageWidth, updateImageHeight } = props;
  return (
    <div id="canvas-container">
      <div id="newproject">
        <p id="newproject-label">Create New Project</p>
        <label id="width-label" htmlFor="newproject-width">
          Image Width:
        </label>
        <input
          className="num-input"
          id="newproject-width"
          type="number"
          min="8"
          max="512"
          step="8"
          onChange={() => {
            updateImageWidth(document.getElementById('newproject-width').value);
          }}
        />
        <label id="height-label" htmlFor="newproject-height">
          Image Height:
        </label>
        <input
          className="num-input"
          id="newproject-height"
          type="number"
          min="8"
          max="512"
          step="8"
          onChange={() => {
            updateImageHeight(document.getElementById('newproject-height').value);
          }}
        />
        <button
          type="button"
          id="create-project-btn"
          onClick={() => {
            updateProjectState(projectStates.IN_PROGRESS);
          }}
        >
          Create
        </button>
        <button
          type="button"
          id="cancel-project-btn"
          onClick={() => {
            updateProjectState(projectStates.UNINITIALIZED);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewProjectForm;
