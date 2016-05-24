import React from 'react';
import AppBar from 'material-ui/AppBar';

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

export default Header;
