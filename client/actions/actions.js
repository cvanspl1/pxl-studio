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
