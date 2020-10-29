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
import * as types from '../constants/actionTypes';

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
  imageWidth: state.canvas.imageWidth,
  imageHeight: state.canvas.imageHeight,
  imageZoom: state.canvas.imageZoom,
});

const mapDispatchToProps = (dispatch) => ({
  updateMousePosition: (newPosition) => dispatch(actions.updateMousePosition(newPosition)),
  mouseDown: (mouseBtn) => dispatch(actions.mouseDown(mouseBtn)),
  mouseUp: (mouseBtn) => dispatch(actions.mouseUp(mouseBtn)),
  updateMode: (newMode) => dispatch(actions.updateMode(newMode)),
  updateLayerState: (newState) => dispatch(actions.updateLayerState(newState)),
  updateImageZoom: (newZoom) => dispatch(actions.updateImageZoom(newZoom)),
});

class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    this.UI = null;
    this.LAYER = null;
    this.CONTAINER = null;
    this.drawOnCanvas = this.drawOnCanvas.bind(this);
    this.eraseCanvas = this.eraseCanvas.bind(this);
  }

  componentDidMount() {
    const { updateMode, imageWidth, imageHeight, updateImageZoom } = this.props;
    const OPTIMAL_ZOOM = Math.max(
      Math.min(
        Math.floor(this.CONTAINER.clientWidth / imageWidth),
        Math.floor(this.CONTAINER.clientHeight / imageHeight)
      ),
      1
    );
    updateImageZoom(OPTIMAL_ZOOM);
    document.addEventListener('keypress', (event) => {
      switch (event.key) {
        case 'd':
          updateMode(types.PEN_MODE);
          break;
        case 'e':
          updateMode(types.ERASER_MODE);
          break;
        case 'f':
          updateMode(types.PAINT_MODE);
          break;
        default:
          break;
      }
    });
  }

  componentDidUpdate() {
    const { currentMode, updateLayerState } = this.props;
    if (currentMode === types.PEN_MODE) this.drawOnCanvas();
    else if (currentMode === types.ERASER_MODE) this.eraseCanvas();
    // Store the updated canvas state for display in the preview pane
    const LAYER_STATE = this.LAYER.toDataURL();
    updateLayerState(LAYER_STATE);
  }

  // Required to handle the scenario where a user clicks a single pixel
  drawOnCanvas() {
    const {
      primaryColor,
      secondaryColor,
      leftMouseDown,
      rightMouseDown,
      mousePosition,
    } = this.props;
    const ACTIVE_LAYER = this.LAYER.getContext('2d');
    // Set the color that is being used to draw
    ACTIVE_LAYER.fillStyle = rightMouseDown ? secondaryColor : primaryColor;
    // Draw on the active layer if the mouse is being clicked
    if (leftMouseDown || rightMouseDown) {
      ACTIVE_LAYER.fillRect(mousePosition.x, mousePosition.y, 1, 1);
    }
  }

  // Required to handle the scenario where a user clicks a single pixel
  eraseCanvas() {
    const { leftMouseDown, rightMouseDown, mousePosition } = this.props;
    const ACTIVE_LAYER = this.LAYER.getContext('2d');
    // Erase on the active layer if the mouse is being clicked
    if (leftMouseDown || rightMouseDown) {
      ACTIVE_LAYER.clearRect(mousePosition.x, mousePosition.y, 1, 1);
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
      imageHeight,
      imageWidth,
      imageZoom,
    } = this.props;

    this.UI = (
      <CanvasUI
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        currentMode={currentMode}
        mousePosition={mousePosition}
        leftMouseDown={leftMouseDown}
        rightMouseDown={rightMouseDown}
        updateMousePosition={updateMousePosition}
        handleMouseDown={mouseDown}
        handleMouseUp={mouseUp}
        imageZoom={imageZoom}
      />
    );
    const BG_ZOOM = Math.min(
      (imageWidth * imageZoom) / (imageWidth / 4),
      (imageHeight * imageZoom) / (imageHeight / 4)
    );
    const PAINT = (
      <canvas
        id="paint-canvas"
        width={imageWidth}
        height={imageHeight}
        ref={(input) => (this.LAYER = input)}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: `${BG_ZOOM}px`,
          width: `${imageWidth * imageZoom}px`,
          height: `${imageHeight * imageZoom}px`,
        }}
      />
    );
    return (
      <div id="canvas-container" ref={(input) => (this.CONTAINER = input)}>
        {this.UI}
        {PAINT}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);
