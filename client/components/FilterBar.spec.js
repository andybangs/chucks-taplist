/* eslint-env mocha */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import FilterBar from './FilterBar';
import { filters } from '../constants';

describe('FilterBar', () => {
  it('should be a div', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <FilterBar
        filter={filters.ALL}
        filterItem={() => true}
        handleFilterClick={() => true}
      />
    );
    const actual = renderer.getRenderOutput().type;
    const expected = 'div';
    expect(actual).toEqual(expected);
  });

  it('should contain Material-UI FlatButton components', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <FilterBar
        filter={filters.ALL}
        filterItem={() => true}
        handleFilterClick={() => true}
      />
    );
    const actual = renderer.getRenderOutput();
    const expected = 'FlatButton';
    expect(actual).toIncludeJSX(expected);
  });

  it('FlatButton components should fire handleFilterClick onTouchTap', () => {
    const renderer = TestUtils.createRenderer();
    const handleFilterClick = () => true;
    renderer.render(
      <FilterBar
        filter={filters.ALL}
        filterItem={() => true}
        handleFilterClick={handleFilterClick}
      />
    );
    const actual = renderer.getRenderOutput().props.children;
    const expected = handleFilterClick;
    actual.forEach(btn => expect(btn.props.onTouchTap).toEqual(expected));
  });

  it('FlatButton corresponding to props.filter should have truthy secondary attribute', () => {
    const renderer = TestUtils.createRenderer();
    const filter = filters.ALL;
    renderer.render(
      <FilterBar
        filter={filter}
        filterItem={() => true}
        handleFilterClick={() => true}
      />
    );
    const actual = renderer.getRenderOutput().props.children;
    actual.forEach(btn => {
      if (btn.props.label === filter) {
        expect(btn.props.secondary).toEqual(true);
      } else {
        expect(btn.props.secondary).toEqual(false);
      }
    });
  });
});
