import React, { PropTypes } from 'react';

const propTypes = {
  source: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
};

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filter: this.props.filters.ALL,
      order: this.props.orders.TAP,
    };

    this.filterItem = this.filterItem.bind(this);
    this.compareItems = this.compareItems.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.handleOrderSelect = this.handleOrderSelect.bind(this);
  }

  componentDidMount() {
    fetch(new Request(this.props.source))
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
    const { filters } = this.props;
    const { filter } = this.state;

    if (filter === filters.ALL) return true;
    if (filter === item.classes[1]) return true;
    if (filter === filters.OTHER && !item.classes[1]) return true;

    return false;
  }

  compareItems(a, b) {
    const { orders } = this.props;
    const { order } = this.state;

    if (order === orders.PRICE) {
      return parseFloat(a.pint.slice(1)) - parseFloat(b.pint.slice(1));
    }

    if (order === orders.ABV) return a.abv - b.abv;

    return a.tap - b.tap;
  }

  handleFilterSelect(event) {
    this.setState({ filter: event.target.value });
  }

  handleOrderSelect(event) {
    this.setState({ order: event.target.value });
  }

  render() {
    const { filters, orders } = this.props;
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
        <h2>Tap List</h2>
        <label htmlFor="styles">Styles: </label>
        <select name="styles" value={filter} onChange={this.handleFilterSelect}>
          {filtersArr.map(createOption)}
        </select>
        <label htmlFor="order">Sort by: </label>
        <select name="order" value={order} onChange={this.handleOrderSelect}>
          {orderArr.map(createOption)}
        </select>
        <ul>
          {data.filter(this.filterItem).sort(this.compareItems).map(createItem)}
        </ul>
      </div>
    );
  }
}

Main.propTypes = propTypes;

export default Main;
