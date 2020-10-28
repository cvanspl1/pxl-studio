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
  }

  componentDidMount() {
    this.CONTEXT = this.UI.getContext('2d');
    this.CONTEXT.fillStyle = this.props.primaryColor;
    this.uiBounds = this.UI.getBoundingClientRect();
    this.xMod = 32 / this.uiBounds.width;
    this.yMod = 32 / this.uiBounds.height;

    window.addEventListener('resize', this.handleResize);

    // Disable right click menu on canvas
    this.UI.addEventListener(
      'contextmenu',
      function (e) {
        e.preventDefault();
      },
      false
    );

    this.CONTEXT.clearRect(0, 0, this.uiBounds.width, this.uiBounds.height);
    this.CONTEXT.fillRect(this.props.mousePosition.x, this.props.mousePosition.y, 1, 1);
  }

  handleMouseMove(event) {
    console.log('Moving Mouse');
    const MOUSE_POS = {
      x: Math.floor((event.clientX - this.uiBounds.left) * this.xMod),
      y: Math.floor((event.clientY - this.uiBounds.top) * this.yMod),
    };
    this.CONTEXT.fillStyle = this.props.rightMouseDown
      ? this.props.secondaryColor
      : this.props.primaryColor;
    this.CONTEXT.clearRect(0, 0, this.uiBounds.width, this.uiBounds.height);
    this.CONTEXT.fillRect(this.props.mousePosition.x, this.props.mousePosition.y, 1, 1);

    const {
      primaryColor,
      secondaryColor,
      leftMouseDown,
      rightMouseDown,
      mousePosition,
    } = this.props;
    const CONTEXT = document.getElementById('paint-canvas').getContext('2d');
    if (leftMouseDown) {
      console.log('DRAWING LEFT');
      CONTEXT.fillStyle = primaryColor;
      CONTEXT.fillRect(mousePosition.x, mousePosition.y, 1, 1);
    } else if (rightMouseDown) {
      console.log('DRAWING RIGHT');
      CONTEXT.fillStyle = secondaryColor;
      CONTEXT.fillRect(mousePosition.x, mousePosition.y, 1, 1);
    }

    this.props.updateMousePosition(MOUSE_POS);
  }

  handleMouseOut() {
    this.CONTEXT.clearRect(0, 0, this.uiBounds.width, this.uiBounds.height);
  }

  handleResize() {
    this.uiBounds = this.UI.getBoundingClientRect();
    this.xMod = 32 / this.uiBounds.width;
    this.yMod = 32 / this.uiBounds.height;
  }

  render() {
    const USER_INTERFACE = (
      <canvas
        id="user-interface"
        width="32"
        height="32"
        ref={(input) => (this.UI = input)}
        onMouseMove={this.handleMouseMove}
        onMouseOut={this.handleMouseOut}
        onMouseEnter={this.handleMouseMove}
        onMouseDown={(e) => {
          this.props.handleMouseDown(e.button);
        }}
        onMouseUp={(e) => {
          this.props.handleMouseUp(e.button);
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
