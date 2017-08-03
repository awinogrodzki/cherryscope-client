import React from 'react';
import { shallow } from 'enzyme';
import Image from './Image';

describe('Image', () => {
  it('should display image', () => {
    const wrapper = shallow(<Image id={1} url={'url'} />);
    const imgWrapper = wrapper.find('img');

    expect(imgWrapper).toHaveLength(1);
    expect(imgWrapper.props().src).toBe('url');
  });
});
