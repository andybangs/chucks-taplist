import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

const propTypes = {
  title: PropTypes.string.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

function Header(props) {
  return (
    <AppBar
      title={props.title}
      titleStyle={{ textAlign: 'center', paddingRight: 48 }}
      style={{ position: 'fixed' }}
      onLeftIconButtonTouchTap={props.handleMenuClick}
    />
  );
}

Header.propTypes = propTypes;

export default Header;
