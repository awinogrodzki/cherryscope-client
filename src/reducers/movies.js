import { DISCOVER_MOVIES, GET_GENRES } from '../actions/types';

const initialState = {
  items: [],
  page: 1,
  pageCount: null,
  itemCount: null,
  genres: [],
};

export default function userReducer(state = initialState, action) {
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
  default:
    return state;
  }
}
