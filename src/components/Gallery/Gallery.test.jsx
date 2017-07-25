import React from 'react';
import { shallow } from 'enzyme';
import Gallery from './Gallery';
import Image from './Image';

describe('Gallery', () => {
  it('should display images from provided data', () => {
    const images = [
      { id: 1, url: 'image_1_url' },
      { id: 2, url: 'image_2_url' },
      { id: 3, url: 'image_3_url' },
    ];
    const wrapper = shallow(<Gallery images={images} />);
    const imageWrapper = wrapper.find(Image);

    expect(imageWrapper).toHaveLength(3);
    expect(imageWrapper.at(0).props().url).toBe('image_1_url');
    expect(imageWrapper.at(1).props().url).toBe('image_2_url');
    expect(imageWrapper.at(2).props().url).toBe('image_3_url');
  });
});
