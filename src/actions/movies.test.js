import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  discoverMovies,
  getGenres,
  searchKeywords,
  clearKeywords,
  searchPeople,
  clearPeople,
  searchCompanies,
  searchMovies,
  clearMovies,
  clearCompanies,
  getMovie,
} from './movies';
import {
  DISCOVER_MOVIES,
  GET_GENRES,
  SEARCH_KEYWORDS,
  CLEAR_KEYWORDS,
  SEARCH_PEOPLE,
  CLEAR_PEOPLE,
  SEARCH_COMPANIES,
  SEARCH_MOVIES,
  CLEAR_MOVIES,
  CLEAR_COMPANIES,
  GET_MOVIE,
} from './types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('services/movie', () => ({
  discover: () => Promise.resolve({
    movies: [1, 2, 3],
    page: 1,
    pageCount: 10,
    itemCount: 20,
  }),
  getGenres: () => Promise.resolve({
    genres: [1, 2, 3],
  }),
  searchKeywords: () => Promise.resolve({
    keywords: [1, 2, 3],
  }),
  searchPeople: () => Promise.resolve({
    people: [1, 2, 3],
  }),
  searchCompanies: () => Promise.resolve({
    companies: [1, 2, 3],
  }),
  searchMovies: () => Promise.resolve({
    movies: [1, 2, 3],
  }),
  getMovie: id => Promise.resolve({ id }),
  getImageUrl: image => image,
}));

describe('movies actions', () => {
  describe('discoverMovies', () => {
    it('should create discover movies action', () => {
      const expectedActions = [
        {
          type: DISCOVER_MOVIES,
          items: [1, 2, 3],
          page: 1,
          pageCount: 10,
          itemCount: 20,
        },
      ];
      const store = mockStore({ movies: {} });

      return store.dispatch(discoverMovies())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should be able to discover and add movies to current list', () => {
      const expectedActions = [
        {
          type: DISCOVER_MOVIES,
          items: [3, 4, 5, 1, 2, 3],
          page: 1,
          pageCount: 10,
          itemCount: 20,
        },
      ];
      const store = mockStore({ movies: { items: [3, 4, 5] } });

      return store.dispatch(discoverMovies({}, true))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  it('should create get genres action', () => {
    const expectedActions = [
      {
        type: GET_GENRES,
        genres: [1, 2, 3],
      },
    ];
    const store = mockStore({ movies: {} });

    return store.dispatch(getGenres())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create search keywords action', () => {
    const expectedActions = [
      {
        type: SEARCH_KEYWORDS,
        keywords: [1, 2, 3],
      },
    ];
    const store = mockStore({ movies: {} });

    return store.dispatch(searchKeywords())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should be able clear keywords', () => {
    const expectedActions = [
      {
        type: CLEAR_KEYWORDS,
      },
    ];
    const store = mockStore({ movies: {} });

    store.dispatch(clearKeywords());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create search people action', () => {
    const expectedActions = [
      {
        type: SEARCH_PEOPLE,
        people: [1, 2, 3],
      },
    ];
    const store = mockStore({ movies: {} });

    return store.dispatch(searchPeople())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should be able clear people', () => {
    const expectedActions = [
      {
        type: CLEAR_PEOPLE,
      },
    ];
    const store = mockStore({ movies: {} });

    store.dispatch(clearPeople());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create search companies action', () => {
    const expectedActions = [
      {
        type: SEARCH_COMPANIES,
        companies: [1, 2, 3],
      },
    ];
    const store = mockStore({ movies: {} });

    return store.dispatch(searchCompanies())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should be able clear companies', () => {
    const expectedActions = [
      {
        type: CLEAR_COMPANIES,
      },
    ];
    const store = mockStore({ movies: {} });

    store.dispatch(clearCompanies());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create search movies action', () => {
    const expectedActions = [
      {
        type: SEARCH_MOVIES,
        movies: [1, 2, 3],
      },
    ];
    const store = mockStore({ movies: {} });

    return store.dispatch(searchMovies())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should be able clear movies', () => {
    const expectedActions = [
      {
        type: CLEAR_MOVIES,
      },
    ];
    const store = mockStore({ movies: {} });

    store.dispatch(clearMovies());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should be able to get movie details', () => {
    const expectedActions = [
      {
        type: GET_MOVIE,
        details: {
          id: 12345,
        },
      },
    ];
    const store = mockStore({ movies: {} });

    return store.dispatch(getMovie(12345))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
