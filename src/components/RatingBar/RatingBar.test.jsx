import React from 'react';
import { shallow } from 'enzyme';
import RatingBar from './RatingBar';

describe('RatingBar', () => {
  it('should set loader width based on values provided', () => {
    const wrapper = shallow(<RatingBar value={0.12} maxValue={1} />);

    expect(
      wrapper.find('[data-test="RatingBar.progressBar"]').props().style.width
    ).toBe('12%');

    wrapper.setProps({ value: 0.5 });

    expect(
      wrapper.find('[data-test="RatingBar.progressBar"]').props().style.width
    ).toBe('50%');
  });

  it('should show value', () => {
    const wrapper = shallow(<RatingBar showValue value={7.55} maxValue={10} />);
    const valueWrapper = wrapper.find('[data-test="RatingBar.value"]');

    expect(valueWrapper).toHaveLength(1);
    expect(valueWrapper.text()).toBe('7.55/10');
  });

  it('should not show value', () => {
    const wrapper = shallow(<RatingBar showValue={false} value={7.55} maxValue={10} />);
    const valueWrapper = wrapper.find('[data-test="RatingBar.value"]');

    expect(valueWrapper).toHaveLength(0);
  });

  it('should show title', () => {
    const wrapper = shallow(<RatingBar title={'testTitle'} />);
    const valueWrapper = wrapper.find('[data-test="RatingBar.title"]');

    expect(valueWrapper).toHaveLength(1);
    expect(valueWrapper.text()).toBe('testTitle');
  });

  it('should not show title', () => {
    const wrapper = shallow(<RatingBar />);
    const valueWrapper = wrapper.find('[data-test="RatingBar.title"]');

    expect(valueWrapper).toHaveLength(0);
  });
});
