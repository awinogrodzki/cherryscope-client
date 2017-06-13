import reducer from './movies';
import {
  DISCOVER_MOVIES,
  GET_GENRES,
  SEARCH_KEYWORDS,
  CLEAR_KEYWORDS,
  SEARCH_PEOPLE,
  CLEAR_PEOPLE,
  SEARCH_COMPANIES,
  CLEAR_COMPANIES,
} from '../actions/types';

const initialState = {
  items: [],
  page: 1,
  pageCount: null,
  itemCount: null,
  genres: [],
  keywords: [],
  companies: [],
};

describe('movies reducer', () => {
  it('should be able to discover movies', () => {
    const action = {
      type: DISCOVER_MOVIES,
      items: [1, 2, 3],
      page: 1,
      pageCount: 10,
      itemCount: 3,
    };

    expect(reducer(initialState, action)).toEqual(expect.objectContaining({
      items: [1, 2, 3],
      page: 1,
      pageCount: 10,
      itemCount: 3,
    }));
  });

  it('should be able to get genres', () => {
    const action = {
      type: GET_GENRES,
      genres: [4, 5, 6],
    };

    expect(reducer(initialState, action)).toEqual(expect.objectContaining({
      genres: [4, 5, 6],
    }));
  });

  it('should be able to search keywords', () => {
    const action = {
      type: SEARCH_KEYWORDS,
      keywords: [7, 8, 9],
    };

    expect(reducer(initialState, action)).toEqual(expect.objectContaining({
      keywords: [7, 8, 9],
    }));
  });

  it('should be able to clear keywords', () => {
    const initialStateWithKeywords = {
      keywords: [1, 2, 3],
    };
    const action = {
      type: CLEAR_KEYWORDS,
    };

    expect(reducer(initialStateWithKeywords, action)).toEqual({
      keywords: [],
    });
  });

  it('should be able to search people', () => {
    const action = {
      type: SEARCH_PEOPLE,
      people: [7, 8, 9],
    };

    expect(reducer(initialState, action)).toEqual(expect.objectContaining({
      people: [7, 8, 9],
    }));
  });

  it('should be able to clear people', () => {
    const initialStateWithPeople = {
      people: [1, 2, 3],
    };
    const action = {
      type: CLEAR_PEOPLE,
    };

    expect(reducer(initialStateWithPeople, action)).toEqual({
      people: [],
    });
  });

  it('should be able to search companies', () => {
    const action = {
      type: SEARCH_COMPANIES,
      companies: [10, 11, 12],
    };

    expect(reducer(initialState, action)).toEqual(expect.objectContaining({
      companies: [10, 11, 12],
    }));
  });

  it('should be able to clear companies', () => {
    const initialStateWithCompanies = {
      companies: [1, 2, 3],
    };
    const action = {
      type: CLEAR_COMPANIES,
    };

    expect(reducer(initialStateWithCompanies, action)).toEqual({
      companies: [],
    });
  });

  it('should be able to return initial state on unknown action', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    };

    expect(reducer(initialState, action)).toEqual(initialState);
  });
});
