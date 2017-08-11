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

  it('should name label class by group id', () => {
    const wrapper = shallow(<MovieSearch />);
    const group = {
      id: 'test',
    };

    expect(wrapper.find(Select).props().getLabelClass(group)).toEqual('testLabel');
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
});
