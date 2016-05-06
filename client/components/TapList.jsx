import React, { PropTypes } from 'react';
import { filters, orders, endpoints } from '../constants';

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
    };

    this.fetchList = this.fetchList.bind(this);
    this.filterItem = this.filterItem.bind(this);
    this.compareItems = this.compareItems.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.handleOrderSelect = this.handleOrderSelect.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
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
    if (filter === filters.OTHER && !item.classes[1]) return true;

    return false;
  }

  compareItems(a, b) {
    switch (this.state.order) {
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

  handleFilterSelect(event) {
    this.setState({ filter: event.target.value });
  }

  handleOrderSelect(event) {
    this.setState({ order: event.target.value });
  }

  handleResetClick() {
    this.setState({ filter: filters.ALL, order: orders.TAP });
  }

  render() {
    const { data, filter, order } = this.state;
    const filtersArr = Object.keys(filters).map(key => filters[key]);
    const orderArr = Object.keys(orders).map(key => orders[key]);

    function createOption(val) {
      return <option key={val} value={val}>{val}</option>;
    }

    function createItem(item) {
      return (
        <li key={item.tap}>
          {item.tap} - {item.brewery} | {item.beer} | {item.pint} | {item.abv}
        </li>
      );
    }

    return (
      <div>
        <label htmlFor="styles">Styles: </label>
        <select name="styles" value={filter} onChange={this.handleFilterSelect}>
          {filtersArr.map(createOption)}
        </select>
        <label htmlFor="order">Sort by: </label>
        <select name="order" value={order} onChange={this.handleOrderSelect}>
          {orderArr.map(createOption)}
        </select>
        <button onClick={this.handleResetClick}>Reset</button>
        <ul>
          {data.filter(this.filterItem).sort(this.compareItems).map(createItem)}
        </ul>
      </div>
    );
  }
}

TapList.propTypes = propTypes;

export default TapList;
