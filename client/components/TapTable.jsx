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
    <TableRow key={item.tap}>
      <TableRowColumn
        style={Object.assign({}, styles[beerStyle], styles.tap)}
      >{item.tap}</TableRowColumn>
      <TableRowColumn
        style={Object.assign({}, styles[beerStyle], styles.brewery)}
      >{item.brewery}</TableRowColumn>
      <TableRowColumn
        style={Object.assign({}, styles[beerStyle], styles.beer)}
      >{item.beer}</TableRowColumn>
      <TableRowColumn
        style={Object.assign({}, styles[beerStyle], styles.pint)}
      >{item.pint}</TableRowColumn>
      <TableRowColumn
        style={Object.assign({}, styles[beerStyle], styles.abv)}
      >{item.abv || 0}</TableRowColumn>
    </TableRow>
  );
}

function headerStyle(propOrder, headerOrder) {
  return propOrder === headerOrder ? styles.selectedHeader : styles.defaultHeader;
}

function TapTable(props) {
  const { data, order, handleOrderClick, filterItem, compareItems } = props;
  const tableRows = data
    .filter(filterItem)
    .sort(compareItems)
    .map(createItem);

  return (
    <Table selectable={false} style={styles.table}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn
            style={Object.assign({}, headerStyle(order, orders.TAP), styles.tap)}
            onTouchTap={() => handleOrderClick(orders.TAP)}
          >
            <FlatButton hoverColor={'#FFF'} style={styles.headerBtnCenter}>#</FlatButton>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={Object.assign({}, headerStyle(order, orders.BREWERY), styles.brewery)}
            onTouchTap={() => handleOrderClick(orders.BREWERY)}
          >
            <FlatButton hoverColor={'#FFF'} style={styles.headerBtnLeft}>brewery</FlatButton>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={Object.assign({}, headerStyle(order, orders.BEER), styles.beer)}
            onTouchTap={() => handleOrderClick(orders.BEER)}
          >
            <FlatButton hoverColor={'#FFF'} style={styles.headerBtnLeft}>beer</FlatButton>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={Object.assign({}, headerStyle(order, orders.PRICE), styles.pint)}
            onTouchTap={() => handleOrderClick(orders.PRICE)}
          >
            <FlatButton hoverColor={'#FFF'} style={styles.headerBtnCenter}>pint</FlatButton>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={Object.assign({}, headerStyle(order, orders.ABV), styles.abv)}
            onTouchTap={() => handleOrderClick(orders.ABV)}
          >
            <FlatButton hoverColor={'#FFF'} style={styles.headerBtnCenter}>abv</FlatButton>
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
  },
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
  headerBtnLeft: {
    textAlign: 'left',
    paddingLeft: 3,
  },
  headerBtnCenter: {
    textAlign: 'center',
  },
  tap: {
    width: '12%',
    textAlign: 'center',
  },
  brewery: {
    width: '31%',
  },
  beer: {
    width: '31%',
  },
  pint: {
    width: '13%',
    textAlign: 'center',
  },
  abv: {
    width: '13%',
    textAlign: 'center',
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
