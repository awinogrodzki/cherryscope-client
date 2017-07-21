import React from 'react';
import { shallow } from 'enzyme';
import MovieSearch from 'components/MovieSearch';
import MovieList from 'components/MovieList';
import MovieDetails from 'components/MovieDetails';
import LoadMore from 'components/LoadMore';
import modalServiceMock from 'services/modal';
import Movies from './Movies';

jest.mock('services/modal', () => ({
  createModal: jest.fn(),
}));

describe('Movies Page', () => {
  beforeEach(() => {
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

  it('should open modal with movie details on movie select', () => {
    const getMoviePromise = Promise.resolve();
    const getMovie = () => getMoviePromise;

    const wrapper = shallow(<Movies getMovie={getMovie} />);
    wrapper.find(MovieList).simulate('movieSelect', 12);

    return getMoviePromise.then(() => {
      const getComponent = modalServiceMock.createModal.mock.calls[0][0];
      const WrappingComponent = () => getComponent();
      const detailsWrapper = shallow(<WrappingComponent />);

      expect(modalServiceMock.createModal).toHaveBeenCalled();
      expect(detailsWrapper.is(MovieDetails)).toEqual(true);
    });
  });

  it('should discover movies on load more', () => {
    const discoverMoviesSpy = jest.fn();
    discoverMoviesSpy.mockReturnValue(Promise.resolve());
    const wrapper = shallow(<Movies discoverMovies={discoverMoviesSpy} pageCount={10} />);
    wrapper.setState({ page: 1 });
    const nextPage = 2;

    wrapper.find(LoadMore).simulate('change', nextPage);
    expect(discoverMoviesSpy).toHaveBeenCalledWith(expect.objectContaining({ page: 2 }), true);
  });

  it('should discover movies on search change', () => {
    const discoverMoviesSpy = jest.fn();
    discoverMoviesSpy.mockReturnValue(Promise.resolve());
    const wrapper = shallow(<Movies discoverMovies={discoverMoviesSpy} />);
    const filters = {};

    wrapper.find(MovieSearch).simulate('change', filters);
    const mappedFilters = discoverMoviesSpy.mock.calls[0][0];

    expect(mappedFilters).toBeInstanceOf(Object);
  });
});
