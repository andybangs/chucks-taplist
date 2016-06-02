import 'whatwg-fetch';
import React, { PropTypes } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Header from './Header';
import FilterBar from './FilterBar';
import TapTable from './TapTable';
import LocationMenu from './LocationMenu';
import { filters, filtersArr, orders, endpoints, titles } from '../constants';

const propTypes = {
  params: PropTypes.object.isRequired,
};

class TapList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      title: titles[this.props.params.location],
      filter: filters.ALL,
      order: orders.TAP,
      menuOpen: false,
      loading: false,
    };

    this.fetchList = this.fetchList.bind(this);
    this.filterItem = this.filterItem.bind(this);
    this.compareItems = this.compareItems.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleOrderClick = this.handleOrderClick.bind(this);
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

  updateTitle(location) {
    this.setState({ title: titles[location] });
  }

  handleMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleFilterClick(event) {
    const target = event.target.innerHTML;
    if (target) this.setState({ filter: target });
  }

  handleOrderClick(order) {
    this.setState({ order });
  }

  render() {
    if (!this.state.loading) {
      return (
        <div>
          <Header
            title={this.state.title}
            handleMenuClick={this.handleMenuClick}
          />
          <LocationMenu
            menuOpen={this.state.menuOpen}
            fetchList={this.fetchList}
            updateTitle={this.updateTitle}
            handleMenuClick={this.handleMenuClick}
          />
          <FilterBar
            filter={this.state.filter}
            handleFilterClick={this.handleFilterClick}
          />
          <div style={styles.body}>
            <TapTable
              data={this.state.data}
              order={this.state.order}
              handleOrderClick={this.handleOrderClick}
              filterItem={this.filterItem}
              compareItems={this.compareItems}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <Header
          title={this.state.title}
          handleMenuClick={this.handleMenuClick}
        />
        <FilterBar
          filter={this.state.filter}
          filterItem={this.filterItem}
          handleFilterClick={this.handleFilterClick}
        />
        <div style={styles.body}>
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
    paddingTop: 64 + 36,
  },
};

TapList.propTypes = propTypes;

export default TapList;
