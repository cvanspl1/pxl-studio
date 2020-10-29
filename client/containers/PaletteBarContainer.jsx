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
import * as actions from '../actions/actions';

const RESURRECT64 = [
  '#2e222f',
  '#3e3546',
  '#625565',
  '#966c6c',
  '#ab947a',
  '#694f62',
  '#7f708a',
  '#9babb2',
  '#c7dcd0',
  '#ffffff',
  '#6e2727',
  '#b33831',
  '#ea4f36',
  '#f57d4a',
  '#ae2334',
  '#e83b3b',
  '#fb6b1d',
  '#f79617',
  '#f9c22b',
  '#7a3045',
  '#9e4539',
  '#cd683d',
  '#e6904e',
  '#fbb954',
  '#4c3e24',
  '#676633',
  '#a2a947',
  '#d5e04b',
  '#fbff86',
  '#165a4c',
  '#239063',
  '#1ebc73',
  '#91db69',
  '#cddf6c',
  '#313638',
  '#374e4a',
  '#547e64',
  '#92a984',
  '#b2ba90',
  '#0b5e65',
  '#0b8a8f',
  '#0eaf9b',
  '#30e1b9',
  '#8ff8e2',
  '#323353',
  '#484a77',
  '#4d65b4',
  '#4d9be6',
  '#8fd3ff',
  '#45293f',
  '#6b3e75',
  '#905ea9',
  '#a884f3',
  '#eaaded',
  '#753c54',
  '#a24b6f',
  '#cf657f',
  '#ed8099',
  '#831c5d',
  '#c32454',
  '#f04f78',
  '#f68181',
  '#fca790',
  '#fdcbb0',
];

// import child components
const mapStateToProps = (state) => ({
  layerState: state.canvas.layerState,
  imageWidth: state.canvas.imageWidth,
  imageHeight: state.canvas.imageHeight,
  imageZoom: state.canvas.imageZoom,
});

const mapDispatchToProps = (dispatch) => ({
  updatePrimaryColor: (newColor) => dispatch(actions.updatePrimaryColor(newColor)),
  updateSecondaryColor: (newColor) => dispatch(actions.updateSecondaryColor(newColor)),
});

class PaletteBarContainer extends Component {
  constructor(props) {
    super(props);
    this.PREVIEW = null;
    this.createPalette = this.createPalette.bind(this);
  }

  componentDidMount() {
    document.getElementById('palettes').addEventListener(
      'contextmenu',
      function (e) {
        e.preventDefault();
      },
      false
    );
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

  createPalette() {
    const { updatePrimaryColor, updateSecondaryColor } = this.props;
    const PALETTE = [];
    for (let i = 0; i < RESURRECT64.length; i++) {
      const COLOR = (
        <div
          className="palette-icon"
          style={{ backgroundColor: RESURRECT64[i] }}
          onClick={() => updatePrimaryColor(RESURRECT64[i])}
          onContextMenu={() => updateSecondaryColor(RESURRECT64[i])}
        />
      );
      PALETTE.push(COLOR);
    }
    return PALETTE;
  }

  render() {
    const PALETTE = this.createPalette();
    const { imageHeight, imageWidth, imageZoom } = this.props;
    const BG_ZOOM = Math.min(imageWidth / (imageWidth / 4), imageHeight / (imageHeight / 4));
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
          Palette
        </label>
        <div id="palettes">{PALETTE}</div>
        <label htmlFor="layers" className="palettebar-label" id="layers-label">
          Layers
        </label>
        <div id="layers" />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaletteBarContainer);
