import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

const filters = {
  ALL: 'all',
  IPA: 'ipa',
  SOUR: 'sour',
  STOUT: 'stout',
  CIDER: 'cider',
  NITRO: 'nitro',
  OTHER: 'other',
};

ReactDOM.render(
  <Main source="/api/beers" filters={filters} />,
  document.getElementById('app')
);
