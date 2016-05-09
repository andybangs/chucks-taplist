import React, { PropTypes } from 'react';
import { filters, orders, endpoints } from '../constants';

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
    if (filter === filters.OTHER && !item.classes[1]) return true;

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

  render() {
    const { data, orderIndex } = this.state;
    const filtersArr = Object.keys(filters).map(key => filters[key]);

    function createItem(item) {
      const beerStyle = item.classes[1] ? item.classes[1] : 'other';

      return (
        <li key={item.tap} className={beerStyle}>
          {item.tap} {item.brewery} | {item.beer} | {item.pint} | {item.abv}
        </li>
      );
    }

    return (
      <div>
        {filtersArr.map(this.createButton)}
        <button className="order" onClick={this.handleOrderClick}>
          {ordersArr[orderIndex]}
        </button>
        <button className="reset" onClick={this.handleResetClick}>reset</button>
        <ul>
          {data.filter(this.filterItem).sort(this.compareItems).map(createItem)}
        </ul>
      </div>
    );
  }
}

TapList.propTypes = propTypes;

export default TapList;
