import React, { PropTypes } from 'react';

import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';

import { orders, filters } from '../constants';

const filtersArr = Object.keys(filters).map(key => filters[key]);

const propTypes = {
  data: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  handleOrderClick: PropTypes.func.isRequired,
  filterItem: PropTypes.func.isRequired,
  compareItems: PropTypes.func.isRequired,
};

function createItem(item) {
  const filterClass = item.classes[1];
  const validFilter = filtersArr.indexOf(filterClass) !== -1;
  const beerStyle = filterClass && validFilter ? filterClass : 'other';

  return (
    <TableRow key={item.tap}>
      <TableRowColumn style={styles[beerStyle]}>{item.tap}</TableRowColumn>
      <TableRowColumn style={styles[beerStyle]}>{item.brewery}</TableRowColumn>
      <TableRowColumn style={styles[beerStyle]}>{item.beer}</TableRowColumn>
      <TableRowColumn style={styles[beerStyle]}>{item.pint}</TableRowColumn>
      <TableRowColumn style={styles[beerStyle]}>{item.abv || 0}</TableRowColumn>
    </TableRow>
  );
}

function TapTable(props) {
  const { data, order, handleOrderClick, filterItem, compareItems } = props;
  const tableRows = data
    .filter(filterItem)
    .sort(compareItems)
    .map(createItem);

  return (
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn
            style={order === orders.TAP ? styles.selectedHeader : styles.defaultHeader}
            onTouchTap={() => handleOrderClick(orders.TAP)}
          >
            <FlatButton hoverColor={'#FFF'} style={styles.headerBtn}>#</FlatButton>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={order === orders.BREWERY ? styles.selectedHeader : styles.defaultHeader}
            onTouchTap={() => handleOrderClick(orders.BREWERY)}
          >
            <FlatButton hoverColor={'#FFF'} style={styles.headerBtn}>brewery</FlatButton>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={order === orders.BEER ? styles.selectedHeader : styles.defaultHeader}
            onTouchTap={() => handleOrderClick(orders.BEER)}
          >
            <FlatButton hoverColor={'#FFF'} style={styles.headerBtn}>beer</FlatButton>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={order === orders.PRICE ? styles.selectedHeader : styles.defaultHeader}
            onTouchTap={() => handleOrderClick(orders.PRICE)}
          >
            <FlatButton hoverColor={'#FFF'} style={styles.headerBtn}>pint</FlatButton>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={order === orders.ABV ? styles.selectedHeader : styles.defaultHeader}
            onTouchTap={() => handleOrderClick(orders.ABV)}
          >
            <FlatButton hoverColor={'#FFF'} style={styles.headerBtn}>abv</FlatButton>
          </TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {tableRows}
      </TableBody>
    </Table>
  );
}

/* eslint no-use-before-define: 0 */
const styles = {
  selectedHeader: {
    fontSize: '1em',
    fontWeight: 'bold',
    color: '#455A64',
    cursor: 'pointer',
  },
  defaultHeader: {
    fontSize: '0.8em',
    cursor: 'pointer',
  },
  headerBtn: {
    textAlign: 'left',
    paddingLeft: 3,
  },
  ipa: {
    color: '#388E3C',
  },
  sour: {
    color: '#FF4081',
  },
  stout: {
    color: '#795548',
  },
  cider: {
    color: '#FBC02D',
  },
  other: {
    color: '#455A64',
  },
};

TapTable.propTypes = propTypes;

export default TapTable;
