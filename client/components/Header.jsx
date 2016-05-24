import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
  handleResetClick: PropTypes.func.isRequired,
};

function Header(props) {
  return (
    <AppBar
      title="Taplist"
      iconElementLeft={<span></span>}
      iconElementRight={
        <FlatButton label="Reset" onTouchTap={props.handleResetClick} />
      }
    />
  );
}

Header.propTypes = propTypes;

export default Header;
