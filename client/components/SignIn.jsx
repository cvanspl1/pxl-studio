/**
 * ************************************
 *
 * @module SignIn.jsx
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Renders the display component for signing in
 *
 * ************************************
 */

import React from 'react';
import * as projectStates from '../constants/projectStates';

const SignIn = (props) => {
  const { updateProjectState } = props;
  return (
    <div id="sign-in-container">
      <div id="sign-in">
        <p id="login-label">Log In</p>
        <div id="spacer" />
        <p
          id="signup-label"
          onClick={() => {
            updateProjectState(projectStates.SIGNUP);
          }}
        >
          Sign Up
        </p>
        <label id="username" htmlFor="username-input">
          Username:
        </label>
        <input id="username-input" type="text" onChange={() => {}} />
        <label id="password" htmlFor="password-input">
          Password:
        </label>
        <input id="password-input" type="password" onChange={() => {}} />
        <button
          type="button"
          id="login-btn"
          onClick={() => {
            updateProjectState(projectStates.SIGNED_IN);
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
