import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';

const propTypes = {
  menuOpen: PropTypes.bool.isRequired,
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
      <MenuItem onTouchTap={props.handleMenuClick}>
        <Link to="/chucks85th" style={styles.link}>Chuck's 85th</Link>
      </MenuItem>
      <MenuItem onTouchTap={props.handleMenuClick}>
        <Link to="/chuckscd" style={styles.link}>Chuck's CD</Link>
      </MenuItem>
    </Drawer>
  );
}

/* eslint no-use-before-define: 0 */
const styles = {
  link: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.870588)',
    cursor: 'pointer',
  },
};

LocationMenu.propTypes = propTypes;

export default LocationMenu;
