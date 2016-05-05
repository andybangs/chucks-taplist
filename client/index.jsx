import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

ReactDOM.render(
  <Main source="/api/beers" />,
  document.getElementById('app')
);
