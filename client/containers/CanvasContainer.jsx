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
  leftMouseDown: state.canvas.leftMouseDown,
  rightMouseDown: state.canvas.rightMouseDown,
});

const mapDispatchToProps = (dispatch) => ({
  updateMousePosition: (newPosition) => dispatch(actions.updateMousePosition(newPosition)),
  mouseDown: (mouseBtn) => dispatch(actions.mouseDown(mouseBtn)),
  mouseUp: (mouseBtn) => dispatch(actions.mouseUp(mouseBtn)),
});

class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    this.UI = null;
    this.LAYER = null;
  }

  componentDidUpdate() {
    const {
      primaryColor,
      secondaryColor,
      leftMouseDown,
      rightMouseDown,
      mousePosition,
    } = this.props;
    const CONTEXT = this.LAYER.getContext('2d');
    if (leftMouseDown) {
      console.log('DRAWING LEFT');
      CONTEXT.fillStyle = primaryColor;
      CONTEXT.fillRect(mousePosition.x, mousePosition.y, 1, 1);
    } else if (rightMouseDown) {
      console.log('DRAWING RIGHT');
      CONTEXT.fillStyle = secondaryColor;
      CONTEXT.fillRect(mousePosition.x, mousePosition.y, 1, 1);
    }
  }

  render() {
    const {
      primaryColor,
      secondaryColor,
      currentMode,
      mousePosition,
      leftMouseDown,
      rightMouseDown,
      updateMousePosition,
      mouseDown,
      mouseUp,
    } = this.props;

    this.UI = (
      <CanvasUI
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        currentMode={currentMode}
        mousePosition={mousePosition}
        leftMouseDown={leftMouseDown}
        rightMouseDown={rightMouseDown}
        updateMousePosition={updateMousePosition}
        handleMouseDown={mouseDown}
        handleMouseUp={mouseUp}
      />
    );

    const PAINT = (
      <canvas
        id="paint-canvas"
        width="32"
        height="32"
        ref={(input) => (this.LAYER = input)}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
    );
    return (
      <div id="canvas-container">
        {this.UI}
        {PAINT}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);
