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

// Initial canvas state when the app loads
const initialState = {
  primaryColor: 'black',
  secondaryColor: 'white',
  currentMode: types.PEN_MODE,
  mousePosition: { x: -Infinity, y: -Infinity },
  leftMouseDown: false,
  rightMouseDown: false,
  activeLayer: -1,
  layers: [],
};

const canvasReducer = (state = initialState, action) => {
  let {
    primaryColor,
    secondaryColor,
    currentMode,
    mousePosition,
    leftMouseDown,
    rightMouseDown,
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

    default:
      return state;
  }
};

export default canvasReducer;
