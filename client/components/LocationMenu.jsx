import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';

const propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  fetchList: PropTypes.func.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

function LocationMenu(props) {
  return (
    <Drawer
      open={props.menuOpen}
      docked={false}
      width={200}
      disableSwipeToOpen
    >
      <Subheader onTouchTap={props.handleMenuClick}>Locations</Subheader>
      <MenuItem
        onTouchTap={() => {
          props.fetchList('chucks85th');
          props.handleMenuClick();
        }}
      >Chuck's 85th</MenuItem>
      <MenuItem
        onTouchTap={() => {
          props.fetchList('chuckscd');
          props.handleMenuClick();
        }}
      >Chuck's CD</MenuItem>
    </Drawer>
  );
}

LocationMenu.propTypes = propTypes;

export default LocationMenu;
