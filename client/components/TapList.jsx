import 'whatwg-fetch';
import React, { PropTypes } from 'react';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';

import Header from './Header';
import { filters, orders, endpoints } from '../constants';

const filtersArr = Object.keys(filters).map(key => filters[key]);

const propTypes = {
  params: PropTypes.object.isRequired,
};

class TapList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filter: filters.ALL,
      order: orders.TAP,
      loading: false,
    };

    this.fetchList = this.fetchList.bind(this);
    this.filterItem = this.filterItem.bind(this);
    this.compareItems = this.compareItems.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleOrderClick = this.handleOrderClick.bind(this);
    this.createButton = this.createButton.bind(this);
  }

  componentDidMount() {
    this.fetchList(this.props.params.location);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchList(nextProps.params.location);
  }

  fetchList(location) {
    this.setState({ loading: true });
    fetch(new Request(endpoints[location]))
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            this.setState({ data: json, loading: false });
          });
        } else {
          this.setState({ loading: false });
          throw new Error('Network response was not ok.');
        }
      })
      .catch(error => {
        this.setState({ loading: false });
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
    switch (this.state.order) {
      case orders.BREWERY:
        return a.brewery.toLowerCase() < b.brewery.toLowerCase() ? -1 : 1;
      case orders.BEER:
        return a.beer.toLowerCase() < b.beer.toLowerCase() ? -1 : 1;
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

  handleOrderClick(order) {
    this.setState({ order });
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
    const { data, order } = this.state;
    const tableRows = data
      .filter(this.filterItem)
      .sort(this.compareItems)
      .map(this.createItem);

    if (!this.state.loading) {
      return (
        <div>
          <Header />

          <div style={styles.body}>
            <div style={styles.filterBtnsCont}>
              {filtersArr.map(this.createButton)}
            </div>

            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn
                    style={order === orders.TAP ? styles.selectedHeader : styles.defaultHeader}
                    onTouchTap={() => this.handleOrderClick(orders.TAP)}
                  >
                    <FlatButton hoverColor={'#FFF'} style={styles.headerBtn}>#</FlatButton>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    style={order === orders.BREWERY ? styles.selectedHeader : styles.defaultHeader}
                    onTouchTap={() => this.handleOrderClick(orders.BREWERY)}
                  >
                    <FlatButton hoverColor={'#FFF'} style={styles.headerBtn}>brewery</FlatButton>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    style={order === orders.BEER ? styles.selectedHeader : styles.defaultHeader}
                    onTouchTap={() => this.handleOrderClick(orders.BEER)}
                  >
                    <FlatButton hoverColor={'#FFF'} style={styles.headerBtn}>beer</FlatButton>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    style={order === orders.PRICE ? styles.selectedHeader : styles.defaultHeader}
                    onTouchTap={() => this.handleOrderClick(orders.PRICE)}
                  >
                    <FlatButton hoverColor={'#FFF'} style={styles.headerBtn}>pint</FlatButton>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    style={order === orders.ABV ? styles.selectedHeader : styles.defaultHeader}
                    onTouchTap={() => this.handleOrderClick(orders.ABV)}
                  >
                    <FlatButton hoverColor={'#FFF'} style={styles.headerBtn}>abv</FlatButton>
                  </TableHeaderColumn>
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

    return (
      <div>
        <Header />

        <div style={styles.body}>
          <div style={styles.filterBtnsCont}>
            {filtersArr.map(this.createButton)}
          </div>

          <RefreshIndicator
            size={50}
            left={window.innerWidth / 2 - 20}
            top={window.innerHeight / 2 - 20}
            status="loading"
          />
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
    paddingLeft: 5,
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
