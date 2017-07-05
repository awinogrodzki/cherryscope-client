import React from 'react';
import { shallow } from 'enzyme';
import Loader from 'components/Loader';
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

  it('should display loader if movie is loading', () => {
    const wrapper = shallow(<Movie isLoading />);
    const loader = wrapper.find(Loader);

    expect(loader).toHaveLength(1);
  });

  it('should not display loader if movie is not loading', () => {
    const wrapper = shallow(<Movie />);
    const loader = wrapper.find(Loader);

    expect(loader).toHaveLength(0);
  });

  it('should pass container on image click', () => {
    const onClickSpy = jest.fn();
    const container = 'testContainer';
    const wrapper = shallow(<Movie onClick={onClickSpy} />);
    wrapper.instance().setContainerRef(container);
    wrapper.find('[data-test="Movie.imageContainer"]').simulate('click');

    expect(onClickSpy).toHaveBeenCalledWith(container);
  });
});
