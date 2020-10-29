/**
 * ************************************
 *
 * @module CanvasUI
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Provides the UI for interacting with the canvas
 *
 * ************************************
 */

import React, { Component } from 'react';
import * as types from '../constants/actionTypes';

class CanvasUI extends Component {
  constructor(props) {
    super(props);
    this.UI = null;
    this.CONTEXT = null;
    this.uiBounds = null;
    this.xMod = null;
    this.yMod = null;
    this.render = this.render.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.drawOnCanvas = this.drawOnCanvas.bind(this);
    this.eraseCanvas = this.eraseCanvas.bind(this);
  }

  componentDidMount() {
    const { imageWidth, imageHeight } = this.props;
    this.CONTEXT = this.UI.getContext('2d');
    this.CONTEXT.fillStyle = this.props.primaryColor;
    window.addEventListener('resize', this.handleResize);

    // Disable right click menu on canvas
    this.UI.addEventListener(
      'contextmenu',
      function (e) {
        e.preventDefault();
      },
      false
    );
  }

  drawOnCanvas(MOUSE_POS) {
    const { primaryColor, secondaryColor, leftMouseDown, rightMouseDown } = this.props;
    const ACTIVE_LAYER = document.getElementById('paint-canvas').getContext('2d');
    // Set the color that is being used to draw
    this.CONTEXT.fillStyle = rightMouseDown ? secondaryColor : primaryColor;
    ACTIVE_LAYER.fillStyle = rightMouseDown ? secondaryColor : primaryColor;
    // Update the pointer on the UI
    this.CONTEXT.clearRect(0, 0, this.uiBounds.width, this.uiBounds.height);
    this.CONTEXT.fillRect(MOUSE_POS.x, MOUSE_POS.y, 1, 1);
    // Draw on the active layer if the mouse is being clicked
    if (leftMouseDown || rightMouseDown) {
      ACTIVE_LAYER.fillRect(MOUSE_POS.x, MOUSE_POS.y, 1, 1);
    }
  }

  eraseCanvas(MOUSE_POS) {
    const { primaryColor, secondaryColor, leftMouseDown, rightMouseDown } = this.props;
    const ACTIVE_LAYER = document.getElementById('paint-canvas').getContext('2d');
    // Set the color that is being used to draw
    this.CONTEXT.fillStyle = 'white';
    this.CONTEXT.globalAlpha = 0.25;
    // Update the pointer on the UI
    this.CONTEXT.clearRect(0, 0, this.uiBounds.width, this.uiBounds.height);
    this.CONTEXT.fillRect(MOUSE_POS.x, MOUSE_POS.y, 1, 1);
    this.CONTEXT.globalAlpha = 1.0;
    // Erase on the active layer if the mouse is being clicked
    if (leftMouseDown || rightMouseDown) {
      ACTIVE_LAYER.clearRect(MOUSE_POS.x, MOUSE_POS.y, 1, 1);
    }
  }

  handleMouseMove(event) {
    const { currentMode, updateMousePosition, imageZoom } = this.props;
    this.uiBounds = this.UI.getBoundingClientRect();
    const MOUSE_POS = {
      x: Math.floor((event.clientX - this.uiBounds.left) / imageZoom),
      y: Math.floor((event.clientY - this.uiBounds.top) / imageZoom),
    };
    updateMousePosition(MOUSE_POS);
    if (currentMode === types.PEN_MODE) this.drawOnCanvas(MOUSE_POS);
    else if (currentMode === types.ERASER_MODE) this.eraseCanvas(MOUSE_POS);
  }

  handleMouseOut() {
    this.CONTEXT.clearRect(0, 0, this.uiBounds.width, this.uiBounds.height);
  }

  handleResize() {
    const { imageWidth, imageHeight } = this.props;
    this.uiBounds = this.UI.getBoundingClientRect();
    this.xMod = imageWidth / this.uiBounds.width;
    this.yMod = imageHeight / this.uiBounds.height;
  }

  render() {
    const { handleMouseDown, handleMouseUp, imageWidth, imageHeight, imageZoom } = this.props;
    const USER_INTERFACE = (
      <canvas
        id="user-interface"
        width={imageWidth}
        height={imageHeight}
        ref={(input) => (this.UI = input)}
        onMouseMove={this.handleMouseMove}
        onMouseOut={this.handleMouseOut}
        onMouseEnter={this.handleMouseMove}
        onMouseDown={(e) => {
          handleMouseDown(e.button);
        }}
        onMouseUp={(e) => {
          handleMouseUp(e.button);
        }}
        style={{
          width: `${imageWidth * imageZoom}px`,
          height: `${imageHeight * imageZoom}px`,
        }}
      />
    );
    return (
      <div className="wrapper" id="canvas-ui">
        {USER_INTERFACE}
      </div>
    );
  }
}

export default CanvasUI;
