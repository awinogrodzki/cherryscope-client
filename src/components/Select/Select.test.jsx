import React from 'react';
import { shallow } from 'enzyme';
import SelectHandler, { SELECT, DESELECT } from './SelectHandler';
import Select from './Select';
import Input from './Input';

const selectedOptions = [
  { label: 'First option', value: 123 },
  { label: 'Second option', value: 321 },
];

jest.mock('./SelectHandler');

describe('Select', () => {
  beforeEach(() => {
    SelectHandler.mockReset();
  });

  it('should pass selected options to input', () => {
    const wrapper = shallow(<Select selectedOptions={selectedOptions} />);

    expect(wrapper.find(Input).props().options).toBe(selectedOptions);
  });

  it('should inform about input value change', () => {
    const onInputChangeSpy = jest.fn();
    const wrapper = shallow(<Select onInputChange={onInputChangeSpy} />);

    wrapper.find(Input).simulate('change', {
      target: {
        value: 'TestValue',
      },
    });

    expect(onInputChangeSpy).toHaveBeenCalledWith('TestValue');
  });

  it('should inform about select change', () => {
    const selectHandler = new SelectHandler();
    const handlers = {};

    selectHandler.addListener = (eventName, listener) => handlers[eventName] = listener;
    SelectHandler.mockImplementation(() => selectHandler);

    const onChangeSpy = jest.fn();
    const wrapper = shallow(<Select onChange={onChangeSpy} />);

    handlers[SELECT](selectedOptions);

    expect(onChangeSpy).toHaveBeenCalledWith(selectedOptions);
  });

  it('should inform about deselect change', () => {
    const selectHandler = new SelectHandler();
    const handlers = {};

    selectHandler.addListener = (eventName, listener) => handlers[eventName] = listener;
    SelectHandler.mockImplementation(() => selectHandler);

    const onChangeSpy = jest.fn();
    const wrapper = shallow(<Select onChange={onChangeSpy} />);

    handlers[DESELECT](selectedOptions);

    expect(onChangeSpy).toHaveBeenCalledWith(selectedOptions);
  });

  it('should should handle option deletion', () => {
    const selectHandler = new SelectHandler();
    SelectHandler.mockImplementation(() => selectHandler);

    const onChangeSpy = jest.fn();
    const wrapper = shallow(<Select />);

    wrapper.find(Input).simulate('optionDelete', selectedOptions[1]);

    expect(selectHandler.deselectOption).toHaveBeenCalledWith(selectedOptions[1]);
  });
});
