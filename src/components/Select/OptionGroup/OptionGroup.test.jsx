import React from 'react';
import { shallow } from 'enzyme';
import OptionGroup from './OptionGroup';
import Option from '../Option';

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

  it('should display custom component instead of options if provided', () => {
    const options = [
      { value: 123, label: 'Option1' },
      { value: 124, label: 'Option2' },
    ];
    const CustomComponent = () => <div />;
    const wrapper = shallow(<OptionGroup
      options={options}
      customComponent={<CustomComponent />}
    />);

    expect(wrapper.find(CustomComponent)).toHaveLength(1);
    expect(wrapper.find(Option)).toHaveLength(0);
  });
});
