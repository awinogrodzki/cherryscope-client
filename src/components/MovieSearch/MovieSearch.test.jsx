import React from 'react';
import { shallow } from 'enzyme';
import Select from 'components/Select';
import MovieSearch from './MovieSearch';

describe('MovieSearch', () => {
  it('should display select component', () => {
    const wrapper = shallow(<MovieSearch />);

    expect(wrapper.find(Select)).toHaveLength(1);
  });
});
