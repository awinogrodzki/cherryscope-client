import React from 'react';
import { shallow } from 'enzyme';
import { find } from 'lodash';
import Select from 'components/Select';
import MovieSearch from './MovieSearch';

jest.mock('services/translate', () => ({
  t: label => label,
}));

describe('MovieSearch', () => {
  it('should display select component', () => {
    const wrapper = shallow(<MovieSearch />);

    expect(wrapper.find(Select)).toHaveLength(1);
  });

  it('should select values', () => {
    const wrapper = shallow(<MovieSearch />);
    const values = [{}, {}, {}];

    wrapper.find(Select).props().onChange(values);

    expect(wrapper.find(Select).props().values).toEqual(values);
  });

  it('should name value class by option type', () => {
    const wrapper = shallow(<MovieSearch />);
    const option = {
      value: 123,
      label: 'Test',
      type: 'test',
    };

    expect(wrapper.find(Select).props().getValueClass(option)).toEqual('testValue');
  });

  it('should name value class by option type', () => {
    const wrapper = shallow(<MovieSearch />);
    const option = {
      value: 123,
      label: 'Test',
      type: 'test',
    };

    expect(wrapper.find(Select).props().getValueClass(option)).toEqual('testValue');
  });

  it('should recognize a date on input change', () => {
    const wrapper = shallow(<MovieSearch />);
    const input = '2017-12-10';
    wrapper.find(Select).props().onInputChange(input);
    expect(
      find(
        wrapper.find(Select).props().optionGroups,
        { label: 'movies.dates' }
      ).options
    ).toHaveLength(2);
  });
});
