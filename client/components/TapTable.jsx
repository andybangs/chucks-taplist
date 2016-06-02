import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';
import { orders, filtersArr } from '../constants';

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
    <TableRow key={item.tap} style={Object.assign({}, colors[beerStyle], styles.tr)}>
      <TableRowColumn
        style={Object.assign({}, styles.tap, styles.td)}
      >{item.tap}</TableRowColumn>
      <TableRowColumn
        style={Object.assign({}, styles.brewery, styles.td)}
      >{item.brewery}</TableRowColumn>
      <TableRowColumn
        style={Object.assign({}, styles.beer, styles.td)}
      >{item.beer}</TableRowColumn>
      <TableRowColumn
        style={Object.assign({}, styles.pint, styles.td)}
      >{item.pint}</TableRowColumn>
      <TableRowColumn
        style={Object.assign({}, styles.abv, styles.td)}
      >{item.abv || 0}</TableRowColumn>
    </TableRow>
  );
}

function headerStyle(propOrder, headerOrder) {
  return propOrder === headerOrder ? styles.selectedHeader : styles.defaultHeader;
}

function isSelected(propOrder, headerOrder) {
  return propOrder === headerOrder;
}

function TapTable(props) {
  const { data, order, handleOrderClick, filterItem, compareItems } = props;
  const tableRows = data
    .filter(filterItem)
    .sort(compareItems)
    .map(createItem);
  // const hoverColor = window.innerWidth < 768 ? '#FFF' : '';

  return (
    <Table selectable={false} style={styles.table}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn
            style={Object.assign({}, headerStyle(order, orders.TAP), styles.tap, styles.th)}
            onTouchTap={() => handleOrderClick(orders.TAP)}
          >
            <FlatButton
              secondary={isSelected(order, orders.TAP)}
              style={styles.headerBtnCenter}
            >#</FlatButton>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={Object.assign({}, headerStyle(order, orders.BREWERY), styles.brewery, styles.th)}
            onTouchTap={() => handleOrderClick(orders.BREWERY)}
          >
            <FlatButton
              secondary={isSelected(order, orders.BREWERY)}
              style={styles.headerBtnLeft}
            >brewery</FlatButton>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={Object.assign({}, headerStyle(order, orders.BEER), styles.beer, styles.th)}
            onTouchTap={() => handleOrderClick(orders.BEER)}
          >
            <FlatButton
              secondary={isSelected(order, orders.BEER)}
              style={styles.headerBtnLeft}
            >beer</FlatButton>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={Object.assign({}, headerStyle(order, orders.PRICE), styles.pint, styles.th)}
            onTouchTap={() => handleOrderClick(orders.PRICE)}
          >
            <FlatButton
              secondary={isSelected(order, orders.PRICE)}
              style={styles.headerBtnCenter}
            >pint</FlatButton>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={Object.assign({}, headerStyle(order, orders.ABV), styles.abv, styles.th)}
            onTouchTap={() => handleOrderClick(orders.ABV)}
          >
            <FlatButton
              secondary={isSelected(order, orders.ABV)}
              style={styles.headerBtnCenter}
            >abv</FlatButton>
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
  table: {
    width: '100%',
    maxWidth: 1000,
    margin: 'auto',
  },
  th: {
    fontFamily: 'Roboto Condensed, sans-serif',
    paddingLeft: 2,
    paddingRight: 2,
  },
  tr: {
    height: 64,
  },
  td: {
    fontFamily: 'Roboto Condensed, sans-serif',
    paddingLeft: 2,
    paddingRight: 2,
    fontSize: '1em',
  },
  selectedHeader: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: '#00BCD4',
  },
  defaultHeader: {
    fontSize: '0.9em',
    fontWeight: 'bold',
  },
  headerBtnLeft: {
    textAlign: 'left',
    minWidth: '100%',
    paddingLeft: 3,
  },
  headerBtnCenter: {
    textAlign: 'center',
    minWidth: '100%',
  },
  tap: {
    width: '13%',
    textAlign: 'center',
  },
  brewery: {
    width: '30%',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
  },
  beer: {
    width: '31%',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
  },
  pint: {
    width: '13%',
    textAlign: 'center',
  },
  abv: {
    width: '13%',
    textAlign: 'center',
  },
};

const colors = {
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
