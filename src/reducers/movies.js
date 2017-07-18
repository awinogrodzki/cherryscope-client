import {
  DISCOVER_MOVIES,
  GET_GENRES,
  SEARCH_KEYWORDS,
  CLEAR_KEYWORDS,
  SEARCH_PEOPLE,
  CLEAR_PEOPLE,
  SEARCH_COMPANIES,
  CLEAR_COMPANIES,
  GET_MOVIE,
} from '../actions/types';

const initialState = {
  items: [],
  page: 1,
  pageCount: null,
  itemCount: null,
  genres: [],
  keywords: [],
  people: [],
  details: {
    id: null,
    imdbId: null,
    overview: null,
    image: null,
    originalTitle: null,
    title: null,
    genres: [],
    directors: [],
    writers: [],
    actors: [],
  },
};

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case DISCOVER_MOVIES:
      return Object.assign({}, state, {
        items: action.items,
        page: action.page,
        pageCount: action.pageCount,
        itemCount: action.itemCount,
      });
    case GET_GENRES:
      return Object.assign({}, state, {
        genres: action.genres,
      });
    case SEARCH_KEYWORDS:
      return Object.assign({}, state, {
        keywords: action.keywords,
      });
    case SEARCH_PEOPLE:
      return Object.assign({}, state, {
        people: action.people,
      });
    case SEARCH_COMPANIES:
      return Object.assign({}, state, {
        companies: action.companies,
      });
    case CLEAR_KEYWORDS:
      return Object.assign({}, state, {
        keywords: [],
      });
    case CLEAR_PEOPLE:
      return Object.assign({}, state, {
        people: [],
      });
    case CLEAR_COMPANIES:
      return Object.assign({}, state, {
        companies: [],
      });
    case GET_MOVIE:
      return Object.assign({}, state, {
        details: action.details,
      });
    default:
      return state;
  }
}
