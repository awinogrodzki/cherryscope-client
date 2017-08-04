import React from 'react';
import { shallow } from 'enzyme';
import Movie from 'components/Movie';
import MovieList from './MovieList';

jest.mock('services/movie', () => ({
  getImageUrl: url => url,
}));

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

  it('should properly map movie type to movie component', () => {
    const movies = [
      {
        id: 123,
        title: 'title',
        original_title: 'original_title',
        poster_path: 'poster_path',
        vote_average: 1,
        vote_count: 2,
        release_date: '2017-12',
      },
    ];
    const wrapper = shallow(<MovieList movies={movies} isLoading={false} />);

    expect(wrapper.find(Movie).props()).toMatchObject({
      title: 'title',
      originalTitle: 'original_title',
      imageUrl: 'poster_path',
      voteAverage: 1,
      voteCount: 2,
      releaseDate: new Date('2017-12'),
    });
  });
});
