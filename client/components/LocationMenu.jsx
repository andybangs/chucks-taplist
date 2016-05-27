import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';

const propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  fetchList: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

class LocationMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(location) {
    window.history.pushState(null, null, location);
    this.props.fetchList(location);
    this.props.updateTitle(location);
    this.props.handleMenuClick();
  }

  render() {
    return (
      <Drawer
        open={this.props.menuOpen}
        docked={false}
        width={200}
        onRequestChange={this.props.handleMenuClick}
        disableSwipeToOpen
      >
        <Subheader>Locations</Subheader>
        <MenuItem
          primaryText="Chuck's 85th"
          onTouchTap={() => this.handleItemClick('chucks85th')}
        />
        <MenuItem
          primaryText="Chuck's CD"
          onTouchTap={() => this.handleItemClick('chuckscd')}
        />
        <Divider />
        <MenuItem>
          <a href="https://github.com/andybangs/tap-list" style={styles.link}>Source</a>
        </MenuItem>
      </Drawer>
    );
  }
}

/* eslint no-use-before-define: 0 */
const styles = {
  link: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.870588)',
  },
};

LocationMenu.propTypes = propTypes;

export default LocationMenu;
