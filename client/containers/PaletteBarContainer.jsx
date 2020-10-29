/**
 * ************************************
 *
 * @module PaletteBarContainer
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Stateful component that renders the palette bar
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import backgroundImage from '../icons/canvasBG.png';

// import child components
const mapStateToProps = (state) => ({
  layerState: state.canvas.layerState,
  imageWidth: state.canvas.imageWidth,
  imageHeight: state.canvas.imageHeight,
  imageZoom: state.canvas.imageZoom,
});

class PaletteBarContainer extends Component {
  constructor(props) {
    super(props);
    this.PREVIEW = null;
  }

  componentDidUpdate() {
    const { layerState } = this.props;
    const CONTEXT = this.PREVIEW.getContext('2d');
    const BOUNDS = this.PREVIEW.getBoundingClientRect();
    // Clear the previous contents from the preview canvas
    CONTEXT.clearRect(0, 0, BOUNDS.width, BOUNDS.height);
    const canvasImage = new Image();
    // Load the data that is on the paint canvas
    canvasImage.onload = () => {
      CONTEXT.drawImage(canvasImage, 0, 0);
    };
    canvasImage.src = layerState;
  }

  render() {
    const { imageHeight, imageWidth, imageZoom } = this.props;
    const BG_ZOOM = Math.min(
      (imageWidth * imageZoom) / (imageWidth / 4),
      (imageHeight * imageZoom) / (imageHeight / 4)
    );
    return (
      <div id="palette-bar">
        <label htmlFor="preview-canvas" className="palettebar-label" id="preview-label">
          Preview
        </label>
        <div id="preview-pane">
          <canvas
            id="preview-canvas"
            width={imageWidth}
            height={imageHeight}
            ref={(input) => (this.PREVIEW = input)}
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: `${BG_ZOOM}px` }}
          />
        </div>
        <label htmlFor="palettes" className="palettebar-label" id="palette-label">
          Palettes
        </label>
        <div id="palettes" />
        <label htmlFor="layers" className="palettebar-label" id="layers-label">
          Layers
        </label>
        <div id="layers" />
      </div>
    );
  }
}

export default connect(mapStateToProps)(PaletteBarContainer);
