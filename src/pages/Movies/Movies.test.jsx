import React from 'react';
import { shallow } from 'enzyme';
import MovieSearch from 'components/MovieSearch';
import MovieList from 'components/MovieList';
import LoadMore from 'components/LoadMore';
import Movies from './Movies';

jest.mock('services/modal', () => ({
  createModal: jest.fn(),
}));

/* eslint-disable global-require */
describe('Movies Page', () => {
  beforeEach(() => {
    const modalServiceMock = require('services/modal');

    modalServiceMock.createModal.mockClear();
  });

  it('should display movie search and movie list components', () => {
    const wrapper = shallow(<Movies />);

    expect(wrapper.find(MovieList)).toHaveLength(1);
    expect(wrapper.find(MovieSearch)).toHaveLength(1);
  });

  it('should be able to load more content if page is lower than page count', () => {
    const wrapper = shallow(<Movies pageCount={10} />);

    wrapper.setState({ page: 1 });
    expect(wrapper.find(LoadMore)).toHaveLength(1);
  });

  it('should not be able to load more pages if page is equal page count', () => {
    const wrapper = shallow(<Movies pageCount={1} />);

    wrapper.setState({ page: 1 });
    expect(wrapper.find(LoadMore)).toHaveLength(0);
  });

  it('should open modal on movie select', () => {
    jest.mock('services/modal', () => 'test');
    const getMoviePromise = Promise.resolve();
    const getMovie = () => getMoviePromise;

    const wrapper = shallow(<Movies getMovie={getMovie} />);
    wrapper.find(MovieList).simulate('movieSelect', 12);

    return getMoviePromise.then(() => {
      const modalServiceMock = require('services/modal');

      expect(modalServiceMock.createModal).toHaveBeenCalled();
    });
  });
});
