import 'whatwg-fetch';
import React, { PropTypes } from 'react';
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
    this.setState({ filter: event.target.value });
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
      <button
        key={val}
        value={val}
        className={this.state.filter === val ? 'active' : null}
        onClick={this.handleFilterClick}
      >
        {val}
      </button>
    );
  }

  createItem(item) {
    const filterClass = item.classes[1];
    const validFilter = filtersArr.indexOf(filterClass) !== -1;
    const beerStyle = filterClass && validFilter ? filterClass : 'other';

    return (
      <tr key={item.tap} className={beerStyle}>
        <td>{item.tap}</td>
        <td>{item.brewery}</td>
        <td>{item.beer}</td>
        <td>{item.pint}</td>
        <td>{item.abv || 0}</td>
      </tr>
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
        <div className="filterBtns">
          {filtersArr.map(this.createButton)}
          <button className="order" onClick={this.handleOrderClick}>
            {ordersArr[orderIndex]}
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>brewery</th>
              <th>beer</th>
              <th>pint</th>
              <th>abv</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    );
  }
}

TapList.propTypes = propTypes;

export default TapList;
