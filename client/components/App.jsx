import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: PropTypes.element.isRequired,
};

function App(props) {
  return (
    <div>
      <h2>Tap List</h2>
      <ul>
        <li><Link to="/chucks85th" activeClassName="active">Chuck's 85th</Link></li>
        <li><Link to="/chuckscd" activeClassName="active">Chuck's CD</Link></li>
      </ul>
      {props.children}
    </div>
  );
}

App.propTypes = propTypes;

export default App;
