import React, { PropTypes } from 'react';

const propTypes = {
  source: PropTypes.string.isRequired,
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
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

  render() {
    function createItem(item) {
      return <li key={item.tap}>{item.tap} - {item.brewery} | {item.beer}</li>;
    }

    return (
      <div>
        <h2>Tap List</h2>
        <ul>{this.state.data.map(createItem)}</ul>
      </div>
    );
  }
}

Main.propTypes = propTypes;

export default Main;
