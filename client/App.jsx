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
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

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
  let appBody = [];
  switch (projectState) {
    case projectStates.CREATING_NEW:
      appBody = [
        <ToolBarContainer />,
        <NewProjectForm
          updateProjectState={updateProjectState}
          updateImageWidth={updateImageWidth}
          updateImageHeight={updateImageHeight}
        />,
        <PaletteBarContainer />,
      ];
      break;
    case projectStates.IN_PROGRESS:
      appBody = [<ToolBarContainer />, <CanvasContainer />, <PaletteBarContainer />];
      break;
    case projectStates.SIGNED_IN:
      appBody = [
        <ToolBarContainer />,
        <WelcomeScreen updateProjectState={updateProjectState} />,
        <PaletteBarContainer />,
      ];
      break;
    case projectStates.SIGNUP:
      appBody = [<SignUp updateProjectState={updateProjectState} />];
      break;
    default:
      appBody = [<SignIn updateProjectState={updateProjectState} />];
  }
  return <div id="main-layout">{appBody}</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
