import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

const propTypes = {
  handleResetClick: PropTypes.func.isRequired,
};

function Header() {
  return (
    <AppBar
      title="Taplist"
      titleStyle={{ textAlign: 'center' }}
      style={{ position: 'fixed' }}
      iconElementLeft={<span></span>}
      iconElementRight={<span></span>}
    />
  );
}

Header.propTypes = propTypes;

export default Header;
