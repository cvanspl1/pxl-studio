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

import React, { Component } from 'react';
import * as projectStates from '../constants/projectStates';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.PREVIEW = null;
    this.handleSignupRequest = this.handleSignupRequest.bind(this);
  }

  handleSignupRequest() {
    const { updateProjectState } = this.props;
    const body = {};
    body.username = document.getElementById('username-input').value;
    body.password = document.getElementById('password-input').value;
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then((resp) => {
        if (resp.status === 200) updateProjectState(projectStates.SIGNED_IN);
      })
      .catch((err) => console.log('CreateCharacter fetch /api/character: ERROR: ', err));
  }

  render() {
    const { updateProjectState } = this.props;
    return (
      <div id="sign-in-container">
        <form id="sign-in">
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
          <button type="button" id="login-btn" onClick={this.handleSignupRequest}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
