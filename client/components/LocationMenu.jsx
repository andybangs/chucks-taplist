import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
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
      </Drawer>
    );
  }
}

LocationMenu.propTypes = propTypes;

export default LocationMenu;
