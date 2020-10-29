/**
 * ************************************
 *
 * @module actions.js
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import * as types from '../constants/actionTypes';

// Canvas action creators
export const updatePrimaryColor = (newColor) => ({
  type: types.UPDATE_PRIMARY_COLOR,
  payload: newColor,
});

export const updateSecondaryColor = (newColor) => ({
  type: types.UPDATE_SECONDARY_COLOR,
  payload: newColor,
});

export const swapPrimaryColor = () => ({
  type: types.SWAP_PRIMARY_COLOR,
  payload: null,
});

export const updateMousePosition = (newPosition) => ({
  type: types.UPDATE_MOUSE_POSITION,
  payload: newPosition,
});

export const updateMode = (newMode) => ({
  type: types.UPDATE_MODE,
  payload: newMode,
});

export const mouseDown = (mouseBtn) => ({
  type: types.MOUSE_DOWN,
  payload: mouseBtn,
});

export const mouseUp = (mouseBtn) => ({
  type: types.MOUSE_UP,
  payload: mouseBtn,
});

export const updateLayerState = (newState) => ({
  type: types.UPDATE_LAYER_STATE,
  payload: newState,
});

export const updateProjectState = (newState) => ({
  type: types.UPDATE_PROJECT_STATE,
  payload: newState,
});

export const updateImageWidth = (newWidth) => ({
  type: types.UPDATE_IMAGE_WIDTH,
  payload: newWidth,
});

export const updateImageHeight = (newHeight) => ({
  type: types.UPDATE_IMAGE_HEIGHT,
  payload: newHeight,
});

export const updateImageZoom = (newZoom) => ({
  type: types.UPDATE_IMAGE_ZOOM,
  payload: newZoom,
});
