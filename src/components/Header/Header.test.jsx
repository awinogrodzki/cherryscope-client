import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  it('should display title', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('.title').text()).toBe('cherryscope');
  });
});
