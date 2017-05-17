import React from 'react';
import { shallow } from 'enzyme';
import OptionGroup from './OptionGroup';

describe('OptionGroup', () => {
  it('should display label', () => {
    const wrapper = shallow(<OptionGroup label={'Label'} />);
    const labelWrapper = wrapper.find('[data-test="OptionGroup.label"]');

    expect(labelWrapper).toHaveLength(1);
    expect(labelWrapper.text()).toBe('Label');
  });

  it('should not display label if label is empty', () => {
    const wrapper = shallow(<OptionGroup label={''} />);

    expect(wrapper.find('[data-test="OptionGroup.label"]')).toHaveLength(0);
  });
});
