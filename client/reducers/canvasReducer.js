/**
 * ************************************
 *
 * @module canvasReducer
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Reducer for canvas data
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';
import * as projectStates from '../constants/projectStates';

// Initial canvas state when the app loads
const initialState = {
  projectState: projectStates.UNINITIALIZED,
  imageWidth: 0,
  imageHeight: 0,
  imageZoom: 1,
  primaryColor: 'black',
  secondaryColor: 'white',
  currentMode: types.PEN_MODE,
  mousePosition: { x: -Infinity, y: -Infinity },
  leftMouseDown: false,
  rightMouseDown: false,
  activeLayer: -1,
  layers: [],
  layerState: null,
};

const canvasReducer = (state = initialState, action) => {
  let {
    primaryColor,
    secondaryColor,
    currentMode,
    mousePosition,
    leftMouseDown,
    rightMouseDown,
    layerState,
    projectState,
    imageWidth,
    imageHeight,
    imageZoom,
  } = state;

  switch (action.type) {
    case types.UPDATE_PRIMARY_COLOR:
      primaryColor = action.payload;
      console.log('Primary Color is now: ', primaryColor);
      return {
        ...state,
        primaryColor,
      };

    case types.UPDATE_SECONDARY_COLOR:
      secondaryColor = action.payload;
      console.log('Secondary Color is now: ', secondaryColor);
      return {
        ...state,
        secondaryColor,
      };

    case types.SWAP_PRIMARY_COLOR:
      [primaryColor, secondaryColor] = [secondaryColor, primaryColor];
      console.log('Primary Color swapped with secondary color');
      return {
        ...state,
        primaryColor,
        secondaryColor,
      };

    case types.UPDATE_MOUSE_POSITION:
      mousePosition.x = action.payload.x;
      mousePosition.y = action.payload.y;
      console.log('Mouse position is now: ', mousePosition);
      return {
        ...state,
        mousePosition,
      };

    case types.UPDATE_MODE:
      currentMode = action.payload;
      console.log('Current mode is now: ', currentMode);
      return {
        ...state,
        currentMode,
      };

    case types.MOUSE_DOWN:
      if (action.payload === 0) {
        console.log('Left mouse is down');
        leftMouseDown = true;
      } else {
        console.log('Right mouse is down');
        rightMouseDown = true;
      }
      return {
        ...state,
        leftMouseDown,
        rightMouseDown,
      };

    case types.MOUSE_UP:
      if (action.payload === 0) {
        console.log('Left mouse is up');
        leftMouseDown = false;
      } else {
        console.log('Right mouse is up');
        rightMouseDown = false;
      }
      return {
        ...state,
        leftMouseDown,
        rightMouseDown,
      };

    case types.UPDATE_LAYER_STATE:
      layerState = action.payload;
      console.log('Layer state is now ', layerState);
      return {
        ...state,
        layerState,
      };

    case types.UPDATE_PROJECT_STATE:
      projectState = action.payload;
      console.log('Project state is now ', projectState);
      return {
        ...state,
        projectState,
      };

    case types.UPDATE_IMAGE_WIDTH:
      imageWidth = action.payload;
      console.log('Image width is now ', imageWidth);
      return {
        ...state,
        imageWidth,
      };

    case types.UPDATE_IMAGE_HEIGHT:
      imageHeight = action.payload;
      console.log('Image height is now ', imageHeight);
      return {
        ...state,
        imageHeight,
      };

    case types.UPDATE_IMAGE_ZOOM:
      imageZoom = action.payload;
      console.log('Image zoom is now ', imageZoom);
      return {
        ...state,
        imageZoom,
      };

    default:
      return state;
  }
};

export default canvasReducer;
