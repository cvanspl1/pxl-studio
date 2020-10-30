/**
 * ************************************
 *
 * @module ToolBarContainer
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Stateful component that renders the tool bar
 *
 * ************************************
 */

import React from 'react';
import { connect } from 'react-redux';

// import child components
import ColorContainer from './ColorContainer.jsx';
import FileMenuContainer from './FileMenuContainer.jsx';
// import actions from action creators file
import * as actions from '../actions/actions';
import * as types from '../constants/actionTypes';

const mapStateToProps = (state) => ({
  currentMode: state.canvas.currentMode,
  layerState: state.canvas.layerState,
});

const mapDispatchToProps = (dispatch) => ({
  updateMode: (newMode) => dispatch(actions.updateMode(newMode)),
});

const ToolBarContainer = (props) => {
  const { layerState } = props;
  // Create pen icon
  const PEN = (
    <button type="button" id="tool-wrapper" onClick="">
      <img
        alt="Activate the pen tool"
        className="icon"
        id="pen"
        src={
          props.currentMode === types.PEN_MODE
            ? require('../icons/selected/pen.svg')
            : require('../icons/pen.svg')
        }
        onClick={() => props.updateMode(types.PEN_MODE)}
        fill="none"
      />
    </button>
  );

  // Create eraser icon
  const ERASER = (
    <button type="button" id="tool-wrapper" onClick="">
      <img
        alt="Activate the eraser tool"
        className="icon"
        id="eraser"
        src={
          props.currentMode === types.ERASER_MODE
            ? require('../icons/selected/eraser.svg')
            : require('../icons/eraser.svg')
        }
        onClick={() => props.updateMode(types.ERASER_MODE)}
        fill="none"
      />
    </button>
  );

  // Create paint icon
  const PAINT = (
    <button type="button" id="tool-wrapper" onClick="">
      <img
        alt="Activate the paint bucket tool"
        className="icon"
        id="paint"
        src={
          props.currentMode === types.PAINT_MODE
            ? require('../icons/selected/paint.svg')
            : require('../icons/paint.svg')
        }
        onClick={() => props.updateMode(types.PAINT_MODE)}
        fill="none"
      />
    </button>
  );

  // Create select icon
  const SELECT = (
    <button type="button" id="tool-wrapper" onClick="">
      <img
        alt="Activate the selection tool"
        className="icon"
        id="select"
        src={
          props.currentMode === types.SELECT_MODE
            ? require('../icons/selected/selection.svg')
            : require('../icons/selection.svg')
        }
        onClick={() => props.updateMode(types.SELECT_MODE)}
        fill="none"
      />
    </button>
  );

  // Create shape icon
  const SHAPE = (
    <button type="button" id="tool-wrapper" onClick="">
      <img
        alt="Activate the shape tool"
        className="icon"
        id="shape"
        src={
          props.currentMode === types.SHAPE_MODE
            ? require('../icons/selected/shape.svg')
            : require('../icons/shape.svg')
        }
        onClick={() => props.updateMode(types.SHAPE_MODE)}
        fill="none"
      />
    </button>
  );

  // Create the eyedropper icon
  const EYE_DROPPER = (
    <button type="button" id="tool-wrapper" onClick="">
      <img
        alt="Activate the eyedropper tool"
        className="icon"
        id="eyedropper"
        src={
          props.currentMode === types.EYEDROPPER_MODE
            ? require('../icons/selected/eyedropper.svg')
            : require('../icons/eyedropper.svg')
        }
        onClick={() => props.updateMode(types.EYEDROPPER_MODE)}
        fill="none"
      />
    </button>
  );

  // Create the move icon
  const MOVE = (
    <button type="button" id="tool-wrapper" onClick="">
      <img
        alt="Activate the move tool"
        className="icon"
        id="move"
        src={
          props.currentMode === types.MOVE_MODE
            ? require('../icons/selected/move.svg')
            : require('../icons/move.svg')
        }
        onClick={() => props.updateMode(types.MOVE_MODE)}
        fill="none"
      />
    </button>
  );

  // Create the zoom icon
  const ZOOM = (
    <button type="button" id="tool-wrapper" onClick="">
      <img
        alt="Swap primary and secondary colors"
        className="icon"
        id="zoom"
        src={
          props.currentMode === types.ZOOM_MODE
            ? require('../icons/selected/zoom.svg')
            : require('../icons/zoom.svg')
        }
        onClick={() => props.updateMode(types.ZOOM_MODE)}
        fill="none"
      />
    </button>
  );

  const DOWNLOAD = (
    <button type="button" id="tool-wrapper" onClick="">
      <a href={layerState} id="tool-wrapper" download>
        <img
          alt="Swap primary and secondary colors"
          className="icon"
          id="download"
          src={require('../icons/download.svg')}
          fill="none"
        />
      </a>
    </button>
  );

  return (
    <div id="toolbar">
      <FileMenuContainer />
      <ColorContainer />
      {PEN}
      {ERASER}
      {PAINT}
      {SELECT}
      {SHAPE}
      {EYE_DROPPER}
      {MOVE}
      {ZOOM}
      {DOWNLOAD}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBarContainer);
