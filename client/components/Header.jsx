import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

const propTypes = {
  handleMenuClick: PropTypes.func.isRequired,
};

function Header(props) {
  return (
    <AppBar
      title="Taplist"
      titleStyle={{ textAlign: 'center', paddingRight: 48 }}
      style={{ position: 'fixed' }}
      onLeftIconButtonTouchTap={props.handleMenuClick}
    />
  );
}

Header.propTypes = propTypes;

export default Header;
