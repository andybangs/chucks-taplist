import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { filtersArr } from '../constants';

const propTypes = {
  filter: PropTypes.string.isRequired,
  filterItem: PropTypes.func.isRequired,
  handleFilterClick: PropTypes.func.isRequired,
};

function FilterBar(props) {
  return (
    <div style={styles.filterBtnsCont}>
      {filtersArr.map(val =>
        <RaisedButton
          key={val}
          label={val}
          secondary={props.filter === val}
          onTouchTap={props.handleFilterClick}
          style={styles.filterBtn}
        />
      )}
    </div>
  );
}

/* eslint no-use-before-define: 0 */
const styles = {
  filterBtnsCont: {
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: '0px 1px 3px grey',
    position: 'fixed',
    marginTop: 64,
    display: 'flex',
    overflow: 'hidden',
    zIndex: 1000,
  },
  filterBtn: {
    flex: 1,
  },
};

FilterBar.propTypes = propTypes;

export default FilterBar;
