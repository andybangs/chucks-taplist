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
      <MenuItem onTouchTap={props.handleMenuClick} style={styles.item}>
        <Link to="/chucks85th" style={styles.link1}>Chuck's 85th</Link>
      </MenuItem>
      <MenuItem onTouchTap={props.handleMenuClick} style={styles.item}>
        <Link to="/chuckscd" style={styles.link2}>Chuck's CD</Link>
      </MenuItem>
    </Drawer>
  );
}

/* eslint no-use-before-define: 0 */
const styles = {
  item: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  link1: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.870588)',
    cursor: 'pointer',
    position: 'absolute',
    top: 50,
    left: 0,
    paddingLeft: 16,
    width: '100%',
  },
  link2: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.870588)',
    cursor: 'pointer',
    position: 'absolute',
    top: 100,
    left: 0,
    paddingLeft: 16,
    width: '100%',
  },
};

LocationMenu.propTypes = propTypes;

export default LocationMenu;
