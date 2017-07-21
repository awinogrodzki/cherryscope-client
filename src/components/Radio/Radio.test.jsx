import React from 'react';
import { shallow } from 'enzyme';
import Radio from './Radio';

const mockOptions = [
  { value: 1, label: 'First' },
  { value: 2, label: 'Second' },
  { value: 3, label: 'Third' },
];

describe('Radio', () => {
  it('should display provided options', () => {
    const wrapper = shallow(<Radio options={mockOptions} />);

    expect(wrapper.find('[data-test="Radio.option"]')).toHaveLength(3);
  });

  it('should set selected class on selected option', () => {
    const wrapper = shallow(<Radio options={mockOptions} value={2} />);

    expect(wrapper.find('[data-test="Radio.option"]').at(1).hasClass('isSelected')).toBe(true);
  });

  it('should return selected value on change', () => {
    const onChangeSpy = jest.fn();
    const wrapper = shallow(<Radio options={mockOptions} onChange={onChangeSpy} />);
    const optionWrapper = wrapper.find('[data-test="Radio.option"]');

    optionWrapper.at(1).find('[data-test="Radio.optionButton"]').simulate('click');

    expect(onChangeSpy).toHaveBeenCalledWith(mockOptions[1].value);
  });
});
