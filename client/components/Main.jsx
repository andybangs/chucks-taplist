import React, { PropTypes } from 'react';

const propTypes = {
  source: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
};

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filter: this.props.filters.ALL,
    };

    this.filterItem = this.filterItem.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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

  handleSelect(event) {
    this.setState({ filter: event.target.value });
  }

  render() {
    const { filters } = this.props;
    const { data, filter } = this.state;
    const filtersArr = Object.keys(filters).map(key => filters[key]);

    function createOption(val) {
      return <option key={val} value={val}>{val}</option>;
    }

    function createItem(item) {
      return <li key={item.tap}>{item.tap} - {item.brewery} | {item.beer}</li>;
    }

    return (
      <div>
        <h2>Tap List</h2>
        <select value={filter} onChange={this.handleSelect}>
          {filtersArr.map(createOption)}
        </select>
        <ul>
          {data.filter(this.filterItem).map(createItem)}
        </ul>
      </div>
    );
  }
}

Main.propTypes = propTypes;

export default Main;
