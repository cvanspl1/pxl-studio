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
import ToolBarContainer from './containers/ToolBarContainer.jsx';
import PaletteBarContainer from './containers/PaletteBarContainer.jsx';
import CanvasContainer from './containers/CanvasContainer.jsx';

const App = () => (
  <div id="main-layout">
    <ToolBarContainer />
    <PaletteBarContainer />
    <CanvasContainer />
  </div>
);

export default App;
