/**
 * ************************************
 *
 * @module ColorContainer
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Provides the UI for selecting the primary and secondary colors
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import actions from action creators file
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
  primaryColor: state.canvas.primaryColor,
  secondaryColor: state.canvas.secondaryColor,
});

const mapDispatchToProps = (dispatch) => ({
  updatePrimaryColor: (newColor) => dispatch(actions.updatePrimaryColor(newColor)),
  updateSecondaryColor: (newColor) => dispatch(actions.updateSecondaryColor(newColor)),
  swapPrimaryColor: () => dispatch(actions.swapPrimaryColor()),
});

class ColorContainer extends Component {
  constructor(props) {
    super(props);
    this.color1 = null;
    this.color2 = null;
    this.handleFirstClick = this.handleFirstClick.bind(this);
    this.handleSecondClick = this.handleSecondClick.bind(this);
  }

  // Allows the wrapper around the primary color input to open the input menu when clicked
  handleFirstClick() {
    this.color1.click();
  }

  // Allows the wrapper around the secondary color input to open the input menu when clicked
  handleSecondClick() {
    this.color2.click();
  }

  render() {
    // Input for the primary color
    const COLOR_1 = (
      <input
        type="color"
        className="color-selector"
        id="col-sel-1"
        value={this.props.primaryColor}
        ref={(input) => (this.color1 = input)}
        onChange={(e) => {
          this.props.updatePrimaryColor(e.target.value);
        }}
      />
    );
    // Wrapper for the primary color selector
    const SELECTOR_1 = (
      <label
        htmlFor="color-sel-1"
        className="icon"
        id="color1"
        style={{ backgroundColor: this.props.primaryColor }}
        onClick={this.handleFirstClick}
      >
        {COLOR_1}
      </label>
    );
    // Input for the secondary color
    const COLOR_2 = (
      <input
        type="color"
        className="color-selector"
        id="col-sel-2"
        value={this.props.secondaryColor}
        ref={(input) => (this.color2 = input)}
        onChange={(e) => {
          this.props.updateSecondaryColor(e.target.value);
        }}
      />
    );
    // Wrapper for the secondary color selector
    const SELECTOR_2 = (
      <label
        htmlFor="color-sel-2"
        className="icon"
        id="color2"
        style={{ backgroundColor: this.props.secondaryColor }}
        onClick={this.handleSecondClick}
      >
        {COLOR_2}
      </label>
    );
    // Button for swapping the primary and secondary colors
    const SWAP = (
      <button type="button" id="swap-btn" onClick={this.props.swapPrimaryColor}>
        <img
          alt="Swap primary and secondary colors"
          className="icon"
          id="swap"
          src={require('../icons/swap_colors.svg')}
          fill="none"
        />
      </button>
    );
    return (
      <div className="wrapper" id="color-container">
        {SELECTOR_1}
        {SELECTOR_2}
        {SWAP}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorContainer);
