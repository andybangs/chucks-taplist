import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { filtersArr } from '../constants';

const propTypes = {
  filter: PropTypes.string.isRequired,
  filterItem: PropTypes.func.isRequired,
  handleFilterClick: PropTypes.func.isRequired,
};

function FilterBar(props) {
  const hoverColor = window.innerWidth < 768 ? '#FFF' : '';

  return (
    <div style={styles.filterBtnsCont}>
      {filtersArr.map(val =>
        <FlatButton
          key={val}
          label={val}
          secondary={props.filter === val}
          onTouchTap={props.handleFilterClick}
          className="filterBtn"
          style={styles.filterBtn}
          backgroundColor={'#FFF'}
          hoverColor={hoverColor}
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
    boxShadow: '0px 1px 2px grey',
    position: 'fixed',
    marginTop: 64,
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: '#FFF',
    zIndex: 1000,
  },
  filterBtn: {
    flex: 1,
    minWidth: 0,
  },
};

FilterBar.propTypes = propTypes;

export default FilterBar;
