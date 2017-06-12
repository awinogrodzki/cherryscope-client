import React from 'react';
import { shallow } from 'enzyme';
import Person from './Person';

describe('Person', () => {
  it('should not display image if no image url is provided', () => {
    const wrapper = shallow(<Person />);

    expect(wrapper.find('[data-test="Person.image"]')).toHaveLength(0);
  });

  it('should display image if valid image url is provided', () => {
    const wrapper = shallow(<Person image={'test_url'} />);

    expect(wrapper.find('[data-test="Person.image"]')).toHaveLength(1);
  });

  it('should display tags', () => {
    const wrapper = shallow(<Person image={'test_url'} tags={[{ label: 'Test' }]} />);

    expect(wrapper.find('[data-test="Person.tag"]')).toHaveLength(1);
    expect(wrapper.find('[data-test="Person.tag"]').text()).toBe('Test');
  });

  it('should not display empty tags', () => {
    const wrapper = shallow(<Person image={'test_url'} tags={[{ label: undefined }]} />);

    expect(wrapper.find('[data-test="Person.tag"]')).toHaveLength(0);
  });
});
