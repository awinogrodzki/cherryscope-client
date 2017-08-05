import React from 'react';
import { shallow } from 'enzyme';
import Company from './Company';

describe('Company', () => {
  it('should not display image if no image url is provided', () => {
    const wrapper = shallow(<Company />);

    expect(wrapper.find('[data-test="Company.image"]')).toHaveLength(0);
  });

  it('should display image if valid image url is provided', () => {
    const wrapper = shallow(<Company imageUrl={'test_url'} />);

    expect(wrapper.find('[data-test="Company.image"]')).toHaveLength(1);
  });
});
