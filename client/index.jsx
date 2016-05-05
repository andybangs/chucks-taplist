import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

const locations = {
  GW: '/api/85th/beers',
  CD: '/api/cd/beers',
};

const filters = {
  ALL: 'all',
  IPA: 'ipa',
  SOUR: 'sour',
  STOUT: 'stout',
  CIDER: 'cider',
  NITRO: 'nitro',
  OTHER: 'other',
};

const orders = {
  TAP: 'tap no.',
  PRICE: 'price',
  ABV: 'abv',
};

ReactDOM.render(
  <Main locations={locations} filters={filters} orders={orders} />,
  document.getElementById('app')
);
