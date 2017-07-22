import React from 'react';
import { shallow } from 'enzyme';
import Movie from 'components/Movie';
import MovieList from './MovieList';

describe('MovieList', () => {
  it('should display loading container if list is loading', () => {
    const wrapper = shallow(<MovieList isLoading />);

    expect(wrapper.find('[data-test="MovieList.isLoading"]')).toHaveLength(1);
  });

  it('should not display loading container if list is not loading', () => {
    const wrapper = shallow(<MovieList isLoading={false} />);

    expect(wrapper.find('[data-test="MovieList.isLoading"]')).toHaveLength(0);
  });

  it('should return movie id on movie click', () => {
    const onMovieSelectSpy = jest.fn();
    const movies = [
      { id: 12345 },
    ];

    const wrapper = shallow(<MovieList
      movies={movies}
      onMovieSelect={onMovieSelectSpy}
    />);

    wrapper.find(Movie).simulate('click', 'testElement');
    expect(onMovieSelectSpy).toHaveBeenCalledWith(12345, 'testElement');
  });
});
