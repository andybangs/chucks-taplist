/* eslint-env mocha */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import TapTable from './TapTable';
import { orders } from '../constants';

describe('TapTable', () => {
  it('should be a Material-UI Table component', () => {
    const data = [
      {
        classes: ['beer_odd', 'ipa'],
        tap: '1',
        brewery: 'Bale Breaker',
        beer: 'Top Cutter IPA',
        pint: '$4.5',
        abv: '6.8',
      },
      {
        classes: ['beer_even', 'stout'],
        tap: '2',
        brewery: 'Stoup',
        beer: 'Smoked Porter',
        pint: '$4',
        abv: '7.2',
      },
    ];
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <TapTable
        data={data}
        order={orders.TAP}
        handleOrderClick={() => true}
        filterItem={() => true}
        compareItems={() => true}
      />
    );
    const actual = renderer.getRenderOutput();
    const expected = 'Table';
    expect(actual).toIncludeJSX(expected);
  });
});
