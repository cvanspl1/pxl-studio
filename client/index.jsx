/**
 * ************************************
 *
 * @module index.jsx
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Entry point for application.  Hangs React app off of #contents in index.html
 *
 * ************************************
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store';
import './styles/mainStyles.css';
import './styles/toolbarStyles.css';

render(
  // wrap the App in the Provider and pass in the store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('contents')
);
