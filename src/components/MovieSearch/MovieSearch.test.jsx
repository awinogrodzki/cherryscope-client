import React from 'react';
import { shallow } from 'enzyme';
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
    wrapper.find(Select).simulate('inputChange', input);

    expect(wrapper.find(Select).props().optionGroups).toContainEqual({
      id: 'dates',
      label: 'movies.dates',
      filterByInput: false,
      isUnique: true,
      options: [
        {
          value: 'primary_release_date.lte',
          label: `movies.date.primary_release_date.lte ${input}`,
          type: 'date',
          date: new Date(input),
        },
        {
          value: 'primary_release_date.gte',
          label: `movies.date.primary_release_date.gte ${input}`,
          type: 'date',
          date: new Date(input),
        },
      ],
    });
  });

  it('should recognize a year on input change and pass according value to select', () => {
    const wrapper = shallow(<MovieSearch />);
    const input = '2017';
    wrapper.find(Select).simulate('inputChange', input);

    expect(wrapper.find(Select).props().optionGroups).toContainEqual({
      id: 'dates',
      label: 'movies.dates',
      filterByInput: false,
      isUnique: true,
      options: [
        {
          value: 'primary_release_date.lte',
          label: `movies.date.primary_release_date.lte ${input}`,
          type: 'date',
          date: new Date(input),
        },
        {
          value: 'primary_release_year',
          label: `movies.date.primary_release_year ${input}`,
          type: 'date',
          date: new Date(input).getFullYear(),
        },
        {
          value: 'primary_release_date.gte',
          label: `movies.date.primary_release_date.gte ${input}`,
          type: 'date',
          date: new Date(input),
        },
      ],
    });
  });

  it('should get values on select change', () => {
    const onChangeSpy = jest.fn();
    const wrapper = shallow(<MovieSearch onChange={onChangeSpy} />);
    const options = [
      { label: 'Test', value: 'test', type: 'date' },
      { label: 'Test1', value: 'test1', type: 'genre' },
    ];
    wrapper.find(Select).simulate('change', options);

    expect(onChangeSpy).toBeCalledWith({
      dates: [
        { label: 'Test', type: 'date', value: 'test' },
      ],
      genres: [
        { label: 'Test1', type: 'genre', value: 'test1' },
      ],
      sortBy: null,
    });
  });
});
