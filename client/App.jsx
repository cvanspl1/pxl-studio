/**
 * ************************************
 *
 * @module App.jsx
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Renders the stateful components of the application
 *
 * ************************************
 */

import React from 'react';
import { connect } from 'react-redux';
import ToolBarContainer from './containers/ToolBarContainer.jsx';
import PaletteBarContainer from './containers/PaletteBarContainer.jsx';
import CanvasContainer from './containers/CanvasContainer.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import NewProjectForm from './components/NewProjectForm.jsx';

import * as projectStates from './constants/projectStates';
import * as actions from './actions/actions';

const mapStateToProps = (state) => ({
  projectState: state.canvas.projectState,
});

const mapDispatchToProps = (dispatch) => ({
  updateProjectState: (newState) => dispatch(actions.updateProjectState(newState)),
  updateImageWidth: (newWidth) => dispatch(actions.updateImageWidth(newWidth)),
  updateImageHeight: (newHeight) => dispatch(actions.updateImageHeight(newHeight)),
});

const App = (props) => {
  const { projectState, updateProjectState, updateImageWidth, updateImageHeight } = props;
  let appBody = null;
  switch (projectState) {
    case projectStates.CREATING_NEW:
      appBody = (
        <NewProjectForm
          updateProjectState={updateProjectState}
          updateImageWidth={updateImageWidth}
          updateImageHeight={updateImageHeight}
        />
      );
      break;
    case projectStates.IN_PROGRESS:
      appBody = <CanvasContainer />;
      break;
    default:
      appBody = <WelcomeScreen updateProjectState={updateProjectState} />;
  }
  return (
    <div id="main-layout">
      <ToolBarContainer />
      {appBody}
      <PaletteBarContainer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
