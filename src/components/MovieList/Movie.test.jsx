import React from 'react';
import { shallow } from 'enzyme';
import Movie from './Movie';

describe('Movie', () => {
  it('should display empty image element if there is no image url', () => {
    const wrapper = shallow(<Movie imageUrl={null} />);

    expect(wrapper.find('[data-test="Movie.image"]')).toHaveLength(0);
    expect(wrapper.find('[data-test="Movie.emptyImage"]')).toHaveLength(1);
  });

  it('should display image element if there is image url', () => {
    const wrapper = shallow(<Movie imageUrl={'test_url'} />);
    const images = wrapper.find('[data-test="Movie.image"]');

    expect(wrapper.find('[data-test="Movie.emptyImage"]')).toHaveLength(0);
    expect(images).toHaveLength(1);
    expect(images.node.props.src).toBe('test_url');
  });
});
