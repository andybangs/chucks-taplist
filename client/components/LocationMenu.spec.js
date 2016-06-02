/* eslint-env mocha */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import LocationMenu from './LocationMenu';

describe('LocationMenu', () => {
  it('should be a Material-UI Drawer component', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <LocationMenu
        menuOpen={false}
        fetchList={() => true}
        updateTitle={() => true}
        handleMenuClick={() => true}
      />
    );
    const actual = renderer.getRenderOutput();
    const expected = 'Drawer';
    expect(actual).toIncludeJSX(expected);
  });

  it('should contain Material-UI MenuItem components', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <LocationMenu
        menuOpen={false}
        fetchList={() => true}
        updateTitle={() => true}
        handleMenuClick={() => true}
      />
    );
    const actual = renderer.getRenderOutput();
    const expected = 'MenuItem';
    expect(actual).toIncludeJSX(expected);
  });
});
