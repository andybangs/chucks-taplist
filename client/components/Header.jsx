import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { titles } from '../constants';

const propTypes = {
  location: PropTypes.string.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

function Header(props) {
  return (
    <AppBar
      title={titles[props.location]}
      titleStyle={{ textAlign: 'center', paddingRight: 48 }}
      style={{ position: 'fixed' }}
      onLeftIconButtonTouchTap={props.handleMenuClick}
    />
  );
}

Header.propTypes = propTypes;

export default Header;
