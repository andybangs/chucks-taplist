import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.element.isRequired,
};

function App(props) {
  return (
    <div>
      <h2>Tap List</h2>
      {props.children}
    </div>
  );
}

App.propTypes = propTypes;

export default App;
