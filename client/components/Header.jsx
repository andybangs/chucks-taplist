import React, { PropTypes } from 'react';

const propTypes = {
  handleResetClick: PropTypes.func.isRequired,
};

function Header(props) {
  return (
    <div className="header">
      <div className="flex-1"></div>
      <h2 className="title">Taplist</h2>
      <div className="reset" onClick={props.handleResetClick}>
        <i className="fa fa-refresh" ></i>
      </div>
    </div>
  );
}

Header.propTypes = propTypes;

export default Header;
