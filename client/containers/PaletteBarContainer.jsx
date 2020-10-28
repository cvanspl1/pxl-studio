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

import React from 'react';
import backgroundImage from '../icons/canvasBG.png';

// import child components

const PaletteBarContainer = (props) => {
  return (
    <div id="palette-bar">
      <label htmlFor="preview-canvas" className="palettebar-label" id="preview-label">
        Preview
      </label>
      <div id="preview-pane">
        <canvas
          id="preview-canvas"
          width="32"
          height="32"
          style={{ backgroundImage: `url(${backgroundImage})` }}
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
};

export default PaletteBarContainer;
