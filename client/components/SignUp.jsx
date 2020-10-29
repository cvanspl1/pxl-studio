/**
 * ************************************
 *
 * @module SignUp.jsx
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Renders the display component for signing up
 *
 * ************************************
 */

import React from 'react';
import * as projectStates from '../constants/projectStates';

const SignUp = (props) => {
  const { updateProjectState } = props;
  return (
    <div id="sign-in-container">
      <div id="sign-in">
        <p
          id="login-label-2"
          onClick={() => {
            updateProjectState(projectStates.LOGIN);
          }}
        >
          Log In
        </p>
        <div id="spacer-2" />
        <p id="signup-label-2">Sign Up</p>
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
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
