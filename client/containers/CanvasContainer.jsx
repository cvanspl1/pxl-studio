/**
 * ************************************
 *
 * @module CanvasContainer
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Stateful component that renders the canvas
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import backgroundImage from '../icons/canvasBG.png';

// import actions from action creators file
import * as actions from '../actions/actions';

// import child components
import CanvasUI from '../components/CanvasUI.jsx';

const mapStateToProps = (state) => ({
  primaryColor: state.canvas.primaryColor,
  secondaryColor: state.canvas.secondaryColor,
  currentMode: state.canvas.currentMode,
  mousePosition: state.canvas.mousePosition,
  activeLayer: state.canvas.activeLayer,
  layers: state.canvas.layers,
});

const mapDispatchToProps = (dispatch) => ({
  updateMousePosition: (newPosition) => dispatch(actions.updateMousePosition(newPosition)),
});

class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    //this.USER_INTERFACE = ();
  }

  render() {
    return (
      <div id="canvas-container">
        <CanvasUI
        primaryColor={this.props.primaryColor}
        secondaryColor={this.props.secondaryColor}
        currentMode={this.props.currentMode}
        mousePosition={this.props.mousePosition}
        updateMousePosition={this.props.updateMousePosition}
        />
        <canvas id="paint-canvas" width="32" height="32" style={{ backgroundImage: `url(${backgroundImage})` }} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);
