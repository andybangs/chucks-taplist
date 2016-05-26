export const filters = {
  ALL: 'all',
  IPA: 'ipa',
  SOUR: 'sour',
  STOUT: 'stout',
  CIDER: 'cider',
  OTHER: 'other',
};

export const filtersArr = Object.keys(filters).map(key => filters[key]);

export const orders = {
  TAP: 'Tap',
  BREWERY: 'Brewery',
  BEER: 'Beer',
  PRICE: 'Price',
  ABV: 'ABV',
};

export const endpoints = {
  chucks85th: '/api/85th/beers',
  chuckscd: '/api/cd/beers',
};

export const titles = {
  chucks85th: 'Chuck\'s 85th',
  chuckscd: 'Chuck\'s CD',
};
