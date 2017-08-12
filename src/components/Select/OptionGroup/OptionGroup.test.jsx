import React from 'react';
import { shallow } from 'enzyme';
import OptionGroup from './OptionGroup';
import Option from '../Option';
import SelectHandler from '../SelectHandler';

let selectHandler = null;

describe('OptionGroup', () => {
  beforeEach(() => {
    selectHandler = new SelectHandler();
  });

  it('should render provided options', () => {
    const options = [
      { label: 'Option1', value: 123 },
      { label: 'Option2', value: 321 },
    ];
    const wrapper = shallow(
      <OptionGroup options={options} />,
      { context: { selectHandler } }
    );

    expect(wrapper.find(Option)).toHaveLength(2);
  });

  it('should not render selected options', () => {
    const options = [
      { label: 'Option1', value: 123 },
      { label: 'Option2', value: 321 },
    ];

    selectHandler.selectOption(options[1]);
    const wrapper = shallow(
      <OptionGroup options={options} />,
      { context: { selectHandler } }
    );

    expect(wrapper.find(Option)).toHaveLength(1);
    expect(wrapper.find(Option).at(0).props().option).toEqual(options[0]);
  });

  it('should select option on click', () => {
    const options = [
      { label: 'Option1', value: 123 },
      { label: 'Option2', value: 321 },
    ];

    const wrapper = shallow(
      <OptionGroup options={options} />,
      { context: { selectHandler } }
    );

    wrapper.find(Option).at(1).simulate('click', options[1]);

    expect(selectHandler.getSelectedOptions()).toHaveLength(1);
    expect(selectHandler.getSelectedOptions()[0]).toEqual(options[1]);
  });

  it('should filter options by query', () => {
    const options = [
      { label: 'Adventure', value: 123 },
      { label: 'Science Fiction', value: 321 },
    ];
    const query = 'FICT';

    const wrapper = shallow(
      <OptionGroup options={options} query={query} shouldFilterByQuery />,
      { context: { selectHandler } }
    );

    expect(wrapper.find(Option)).toHaveLength(1);
    expect(wrapper.find(Option).props().option).toEqual(options[1]);
  });
});
