import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
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
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
  },
  filterBtn: {
    flex: 1,
  },
};

FilterBar.propTypes = propTypes;

export default FilterBar;
