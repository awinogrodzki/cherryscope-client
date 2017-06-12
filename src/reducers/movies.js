import {
  DISCOVER_MOVIES,
  GET_GENRES,
  SEARCH_KEYWORDS,
  CLEAR_KEYWORDS,
} from '../actions/types';

const initialState = {
  items: [],
  page: 1,
  pageCount: null,
  itemCount: null,
  genres: [],
  keywords: [],
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
    case CLEAR_KEYWORDS:
      return Object.assign({}, state, {
        keywords: [],
      });
    default:
      return state;
  }
}
