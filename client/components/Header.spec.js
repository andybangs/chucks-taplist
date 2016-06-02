/* eslint-env mocha */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import Header from './Header';

describe('Header', () => {
  it('should be a Material-UI AppBar component', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Header
        title="Chuck's 85th"
        handleMenuClick={() => true}
      />
    );
    const actual = renderer.getRenderOutput().type.muiName;
    const expected = 'AppBar';
    expect(actual).toEqual(expected);
  });

  it('should render the title', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Header
        title="Chuck's 85th"
        handleMenuClick={() => true}
      />
    );
    const actual = renderer.getRenderOutput();
    const expected = 'Chuck\'s 85th';
    expect(actual).toIncludeJSX(expected);
  });

  it('should fire handleMenuClick onLeftIconButtonTouchTap', () => {
    const renderer = TestUtils.createRenderer();
    const handleMenuClick = () => true;
    renderer.render(
      <Header
        title="Chuck's 85th"
        handleMenuClick={handleMenuClick}
      />
    );
    const actual = renderer.getRenderOutput().props.onLeftIconButtonTouchTap;
    const expected = handleMenuClick;
    expect(actual).toEqual(expected);
  });
});
