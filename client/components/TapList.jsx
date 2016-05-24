import 'whatwg-fetch';
import React, { PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';

import Header from './Header';
import { filters, orders, endpoints } from '../constants';

const filtersArr = Object.keys(filters).map(key => filters[key]);
const ordersArr = Object.keys(orders).map(key => orders[key]);

const propTypes = {
  params: PropTypes.object.isRequired,
};

class TapList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filter: filters.ALL,
      orderIndex: 0,
    };

    this.fetchList = this.fetchList.bind(this);
    this.filterItem = this.filterItem.bind(this);
    this.compareItems = this.compareItems.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleOrderClick = this.handleOrderClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.createButton = this.createButton.bind(this);
  }

  componentDidMount() {
    this.fetchList(this.props.params.location);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchList(nextProps.params.location);
  }

  fetchList(location) {
    fetch(new Request(endpoints[location]))
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            this.setState({ data: json });
          });
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(error => {
        throw new Error(`Fetch operation failed: ${error.message}`);
      });
  }

  filterItem(item) {
    const { filter } = this.state;

    if (filter === filters.ALL) return true;
    if (filter === item.classes[1]) return true;
    if ((filter === filters.OTHER) &&
      (!item.classes[1] ||
        item.classes[1] && filtersArr.indexOf(item.classes[1]) === -1)
      ) return true;

    return false;
  }

  compareItems(a, b) {
    switch (ordersArr[this.state.orderIndex]) {
      case orders.BREWERY:
        return a.brewery.toLowerCase() < b.brewery.toLowerCase() ? -1 : 1;
      case orders.PRICE:
        return parseFloat(a.pint.slice(1)) - parseFloat(b.pint.slice(1));
      case orders.ABV:
        return a.abv - b.abv;
      default:
        return a.tap - b.tap;
    }
  }

  handleFilterClick(event) {
    const target = !event.target.children.length ?
      event.target.innerHTML ||                                       // desktop + mobile
        event.target.parentNode.nextSibling.children[0].innerHTML :   // desktop
      event.target.children[0].innerHTML ||                           // mobile
        event.target.nextSibling.children[0].innerHTML;               // mobile

    if (target) this.setState({ filter: target });
  }

  handleOrderClick() {
    const { orderIndex } = this.state;
    const nextIndex = orderIndex < ordersArr.length - 1 ? orderIndex + 1 : 0;
    this.setState({ orderIndex: nextIndex });
  }

  handleResetClick() {
    this.setState({ filter: filters.ALL, orderIndex: 0 });
  }

  createButton(val) {
    return (
      <RaisedButton
        key={val}
        label={val}
        secondary={this.state.filter === val}
        onTouchTap={this.handleFilterClick}
        style={styles.filterBtn}
      />
    );
  }

  createItem(item) {
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

  render() {
    const { data, orderIndex } = this.state;
    const tableRows = data
      .filter(this.filterItem)
      .sort(this.compareItems)
      .map(this.createItem);

    return (
      <div>
        <Header handleResetClick={this.handleResetClick} />

        <div style={styles.body}>
          <div style={styles.filterBtnsCont}>
            {filtersArr.map(this.createButton)}
          </div>

          <FlatButton onTouchTap={this.handleOrderClick} style={styles.orderBtn}>
            Sort by: {ordersArr[orderIndex]}
          </FlatButton>

          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>#</TableHeaderColumn>
                <TableHeaderColumn>brewery</TableHeaderColumn>
                <TableHeaderColumn>beer</TableHeaderColumn>
                <TableHeaderColumn>pint</TableHeaderColumn>
                <TableHeaderColumn>abv</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {tableRows}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

/* eslint no-use-before-define: 0 */
const styles = {
  body: {
    paddingTop: 64,
  },
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
  orderBtn: {
    width: '100%',
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

TapList.propTypes = propTypes;

export default TapList;
