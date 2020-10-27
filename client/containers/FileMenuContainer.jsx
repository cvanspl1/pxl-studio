/**
 * ************************************
 *
 * @module FileMenuContainer
 * @author Corey Van Splinter
 * @date 10/27/2020
 * @description Stateful component that renders the tool bar
 *
 * ************************************
 */

import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

const FileMenuContainer = (props) => (
  <div className="wrapper" id="file-menu-container">
    <button type="button" className="label" id="file-menu">
      <p id="pxl">PXL</p>
      <p id="studio">Studio</p>
    </button>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(FileMenuContainer);
