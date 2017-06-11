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

    expect(wrapper.find(Select).props().optionGroups).toContainEqual(
      expect.objectContaining({
        options: [
          expect.objectContaining({
            value: 'primary_release_date.lte',
            type: 'date',
            date: new Date(input),
          }),
          expect.objectContaining({
            value: 'primary_release_date.gte',
            type: 'date',
            date: new Date(input),
          }),
        ],
      })
    );
  });

  it('should recognize a year on input change and pass according value to select', () => {
    const wrapper = shallow(<MovieSearch />);
    const input = '2017';
    wrapper.find(Select).simulate('inputChange', input);

    expect(wrapper.find(Select).props().optionGroups).toContainEqual(
      expect.objectContaining({
        options: [
          expect.objectContaining({
            value: 'primary_release_date.lte',
            type: 'date',
            date: new Date(input),
          }),
          expect.objectContaining({
            value: 'primary_release_year',
            type: 'date',
            date: new Date(input).getFullYear(),
          }),
          expect.objectContaining({
            value: 'primary_release_date.gte',
            type: 'date',
            date: new Date(input),
          }),
        ],
      })
    );
  });

  it('should not show date options if primary release year is selected', () => {
    const wrapper = shallow(<MovieSearch />);
    const input = '2017';
    const options = [
      {
        label: 'Test',
        value: 'primary_release_year',
      },
    ];

    wrapper.find(Select).simulate('inputChange', input);
    wrapper.find(Select).simulate('change', options);

    expect(wrapper.find(Select).props().optionGroups).toContainEqual(
      expect.objectContaining({
        options: null,
      })
    );
  });

  it('should not show primary release year option if primary release date is selected', () => {
    const wrapper = shallow(<MovieSearch />);
    const input = '2017';
    const options = [
      {
        label: 'Test',
        value: 'primary_release_date.gte',
      },
    ];

    wrapper.find(Select).simulate('inputChange', input);
    wrapper.find(Select).simulate('change', options);
    wrapper.find(Select).simulate('inputChange', input);

    expect(wrapper.find(Select).props().optionGroups).toContainEqual(
      expect.objectContaining({
        options: [
          expect.objectContaining({
            value: 'primary_release_date.lte',
            type: 'date',
            date: new Date(input),
          }),
          expect.objectContaining({
            value: 'primary_release_date.gte',
            type: 'date',
            date: new Date(input),
          }),
        ],
      })
    );
  });

  it('should segregate values by type on select change', () => {
    const onChangeSpy = jest.fn();
    const wrapper = shallow(<MovieSearch onChange={onChangeSpy} />);
    const options = [
      { label: 'Test', value: 'test', type: 'date' },
      { label: 'Test1', value: 'test1', type: 'genre' },
    ];
    wrapper.find(Select).simulate('change', options);

    expect(onChangeSpy).toBeCalledWith(
      expect.objectContaining({
        dates: [
          { label: 'Test', type: 'date', value: 'test' },
        ],
        genres: [
          { label: 'Test1', type: 'genre', value: 'test1' },
        ],
      })
    );
  });

  it('should pass vote options with data on change', () => {
    const onChangeSpy = jest.fn();
    const wrapper = shallow(<MovieSearch onChange={onChangeSpy} />);
    const options = [
      { label: 'Test', value: 'test', type: 'vote', data: 123 },
    ];
    wrapper.find(Select).simulate('change', options);

    expect(onChangeSpy).toBeCalledWith(
      expect.objectContaining({
        votes: [
          { label: 'Test', type: 'vote', value: 'test', data: 123 },
        ],
      })
    );
  });

  it('should show vote count options if input value is a number', () => {
    const wrapper = shallow(<MovieSearch />);
    const input = '1000';

    wrapper.find(Select).simulate('inputChange', input);

    expect(wrapper.find(Select).props().optionGroups).toContainEqual(
      expect.objectContaining({
        options: [
          expect.objectContaining({
            value: 'vote_count.gte',
            type: 'vote',
            data: input,
          }),
          expect.objectContaining({
            value: 'vote_count.lte',
            type: 'vote',
            data: input,
          }),
        ],
      })
    );
  });

  it('should show vote average options if input value is a number between 0 and 10', () => {
    const wrapper = shallow(<MovieSearch />);
    const input = '5.5';

    wrapper.find(Select).simulate('inputChange', input);

    expect(wrapper.find(Select).props().optionGroups).toContainEqual(
      expect.objectContaining({
        options: expect.arrayContaining([
          expect.objectContaining({
            value: 'vote_average.gte',
            type: 'vote',
            data: input,
          }),
          expect.objectContaining({
            value: 'vote_average.lte',
            type: 'vote',
            data: input,
          }),
        ]),
      })
    );
  });
});