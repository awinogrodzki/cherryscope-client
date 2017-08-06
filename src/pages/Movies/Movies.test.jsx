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

  it('should not open modal if movie is loading', () => {
    const getMoviePromise = Promise.resolve();
    const getMovie = () => getMoviePromise;

    const wrapper = shallow(<Movies getMovie={getMovie} />);
    wrapper.setState({ loadingMovieId: 10 });
    wrapper.find(MovieList).simulate('movieSelect', 12);

    return getMoviePromise.then(() => {
      expect(modalServiceMock.createModal).toHaveBeenCalledTimes(0);
    });
  });

  it('should stop loading on error', () => {
    const getMoviePromise = Promise.reject();
    const getMovie = () => getMoviePromise;

    const wrapper = shallow(<Movies getMovie={getMovie} />);
    wrapper.find(MovieList).simulate('movieSelect', 12);
    expect(wrapper.state().loadingMovieId).toBe(12);

    // there is no mechanism to check this other way
    return new Promise((resolve) => {
      setTimeout(() => {
        expect(wrapper.state().loadingMovieId).toBe(null);
        resolve();
      }, 10);
    });
  });

  it('should stop loading list on error', () => {
    const discoverMoviesPromise = Promise.reject();
    const discoverMovies = () => discoverMoviesPromise;

    const wrapper = shallow(<Movies discoverMovies={discoverMovies} />);
    wrapper.find(MovieSearch).simulate('change', {});
    expect(wrapper.state().isListLoading).toBe(true);

    return discoverMoviesPromise.catch(() => {
    }).then(() => expect(wrapper.state().isListLoading).toBe(false));
  });

  it('should open movie modal on movie click inside movie search component', () => {
    const getMoviePromise = Promise.resolve();
    const getMovie = () => getMoviePromise;

    const wrapper = shallow(<Movies getMovie={getMovie} />);
    wrapper.find(MovieSearch).simulate('movieClick', 12);

    return getMoviePromise.then(() => {
      expect(modalServiceMock.createModal).toHaveBeenCalledTimes(1);
    });
  });

  it('should not open another modal if movie from movie search component is selected', () => {
    const getMoviePromise = Promise.resolve();
    const getMovie = () => getMoviePromise;

    const wrapper = shallow(<Movies getMovie={getMovie} />);
    wrapper.find(MovieSearch).simulate('movieClick', 12);
    wrapper.find(MovieSearch).simulate('movieClick', 12);

    return getMoviePromise.then(() => {
      expect(modalServiceMock.createModal).toHaveBeenCalledTimes(1);
    });
  });

  it('should re-focus input on movie modal unmount', () => {
    const getMoviePromise = Promise.resolve();
    const getMovie = () => getMoviePromise;
    const input = { focus: jest.fn() };

    const wrapper = shallow(<Movies getMovie={getMovie} />);
    wrapper.find(MovieSearch).simulate('movieClick', 12);
    wrapper.find(MovieSearch).props().getInput(input);

    return getMoviePromise.then(() => {
      modalServiceMock.createModal.mock.calls[0][1].onWillUnmount();
      expect(input.focus).toHaveBeenCalled();
    });
  });

  it('should keep movie search expanded if movie modal is opened', () => {
    const getMoviePromise = Promise.resolve();
    const getMovie = () => getMoviePromise;
    const wrapper = shallow(<Movies getMovie={getMovie} />);
    wrapper.find(MovieSearch).simulate('movieClick', 12);

    expect(wrapper.find(MovieSearch).props().isExpanded).toBe(true);
    wrapper.find(MovieSearch).props().getInput({ focus: () => {} });

    return getMoviePromise.then(() => {
      modalServiceMock.createModal.mock.calls[0][1].onWillUnmount();
      expect(wrapper.find(MovieSearch).props().isExpanded).toBe(false);
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
    expect(discoverMoviesSpy).toHaveBeenCalledWith(expect.objectContaining({ page: 1 }), false);
  });

  it('should be able to map companies', () => {
    const discoverMoviesSpy = jest.fn();
    discoverMoviesSpy.mockReturnValue(Promise.resolve());
    const wrapper = shallow(<Movies discoverMovies={discoverMoviesSpy} />);
    const filters = { companies: [
      { value: 1 },
      { value: 123 },
      { value: 321 },
    ] };

    wrapper.find(MovieSearch).simulate('change', filters);
    expect(discoverMoviesSpy).toHaveBeenCalledWith(expect.objectContaining({ with_companies: '1,123,321' }), false);
  });

  it('should be able to map people', () => {
    const discoverMoviesSpy = jest.fn();
    discoverMoviesSpy.mockReturnValue(Promise.resolve());
    const wrapper = shallow(<Movies discoverMovies={discoverMoviesSpy} />);
    const filters = { people: [
      { value: 1 },
      { value: 123 },
      { value: 321 },
    ] };

    wrapper.find(MovieSearch).simulate('change', filters);
    expect(discoverMoviesSpy).toHaveBeenCalledWith(expect.objectContaining({ with_people: '1,123,321' }), false);
  });

  it('should be able to map keywords', () => {
    const discoverMoviesSpy = jest.fn();
    discoverMoviesSpy.mockReturnValue(Promise.resolve());
    const wrapper = shallow(<Movies discoverMovies={discoverMoviesSpy} />);
    const filters = { keywords: [
      { value: 1 },
      { value: 123 },
      { value: 321 },
    ] };

    wrapper.find(MovieSearch).simulate('change', filters);
    expect(discoverMoviesSpy).toHaveBeenCalledWith(expect.objectContaining({ with_keywords: '1,123,321' }), false);
  });

  it('should be able to map genres', () => {
    const discoverMoviesSpy = jest.fn();
    discoverMoviesSpy.mockReturnValue(Promise.resolve());
    const wrapper = shallow(<Movies discoverMovies={discoverMoviesSpy} />);
    const filters = { genres: [
      { value: 1 },
      { value: 123 },
      { value: 321 },
    ] };

    wrapper.find(MovieSearch).simulate('change', filters);
    expect(discoverMoviesSpy).toHaveBeenCalledWith(expect.objectContaining({ with_genres: '1,123,321' }), false);
  });

  it('should be able to map dates', () => {
    const discoverMoviesSpy = jest.fn();
    discoverMoviesSpy.mockReturnValue(Promise.resolve());
    const wrapper = shallow(<Movies discoverMovies={discoverMoviesSpy} />);
    const firstDate = new Date();
    const secondDate = new Date(firstDate.getDate() + 1);
    const thirdDate = new Date(firstDate.getDate() + 2);
    const filters = { dates: [
      { value: 'primary_release_date.lte', date: firstDate },
      { value: 'primary_release_date.gte', date: secondDate },
      { value: 'test_value', date: thirdDate },
    ] };

    wrapper.find(MovieSearch).simulate('change', filters);
    expect(discoverMoviesSpy.mock.calls[0][0]).toMatchObject({
      'primary_release_date.lte': firstDate,
      'primary_release_date.gte': secondDate,
      test_value: thirdDate,
    });
  });

  it('should be able to map sort', () => {
    const discoverMoviesSpy = jest.fn();
    discoverMoviesSpy.mockReturnValue(Promise.resolve());
    const wrapper = shallow(<Movies discoverMovies={discoverMoviesSpy} />);
    const filters = { sortBy: 'test' };

    wrapper.find(MovieSearch).simulate('change', filters);
    expect(discoverMoviesSpy.mock.calls[0][0]).toMatchObject({
      sort_by: 'test',
    });
  });

  it('should be able to map language', () => {
    const discoverMoviesSpy = jest.fn();
    discoverMoviesSpy.mockReturnValue(Promise.resolve());
    const wrapper = shallow(<Movies discoverMovies={discoverMoviesSpy} />);
    const filters = { language: { value: 'testLanguage' } };

    wrapper.find(MovieSearch).simulate('change', filters);
    expect(discoverMoviesSpy.mock.calls[0][0]).toMatchObject({
      with_original_language: 'testLanguage',
    });
  });

  it('should be able to map votes', () => {
    const discoverMoviesSpy = jest.fn();
    discoverMoviesSpy.mockReturnValue(Promise.resolve());
    const wrapper = shallow(<Movies discoverMovies={discoverMoviesSpy} />);
    const filters = { votes: [
      { value: 'vote_count.lte', data: 1 },
      { value: 'vote_count.gte', data: 2 },
      { value: 'test_value', data: 3 },
    ] };

    wrapper.find(MovieSearch).simulate('change', filters);
    expect(discoverMoviesSpy.mock.calls[0][0]).toMatchObject({
      'vote_count.lte': 1,
      'vote_count.gte': 2,
      test_value: 3,
    });
  });

  it('should not map uncorrect votes', () => {
    const discoverMoviesSpy = jest.fn();
    discoverMoviesSpy.mockReturnValue(Promise.resolve());
    const wrapper = shallow(<Movies discoverMovies={discoverMoviesSpy} />);
    const filters = { votes: [
      'test',
      null,
      undefined,
    ] };

    wrapper.find(MovieSearch).simulate('change', filters);
    expect(discoverMoviesSpy.mock.calls[0][0].votes).not.toBeDefined();
  });

  it('should not map uncorrect dates', () => {
    const discoverMoviesSpy = jest.fn();
    discoverMoviesSpy.mockReturnValue(Promise.resolve());
    const wrapper = shallow(<Movies discoverMovies={discoverMoviesSpy} />);
    const filters = { dates: [
      'test',
      null,
      undefined,
    ] };

    wrapper.find(MovieSearch).simulate('change', filters);
    expect(discoverMoviesSpy.mock.calls[0][0].dates).not.toBeDefined();
  });

  it('should discover movies on mount', () => {
    const discoverMoviesSpy = jest.fn();
    discoverMoviesSpy.mockReturnValue(Promise.resolve());
    const wrapper = shallow(<Movies discoverMovies={discoverMoviesSpy} />);
    wrapper.instance().componentDidMount();

    expect(discoverMoviesSpy).toHaveBeenCalled();
  });
});
