/**
 * ************************************
 *
 * @module index.js
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Module for combining reducers
 *
 * ************************************
 */

import { combineReducers } from 'redux';
import canvasReducer from './canvasReducer';

// Combine reducers
const reducers = combineReducers({
  canvas: canvasReducer,
});

// make the combined reducers available for import
export default reducers;
