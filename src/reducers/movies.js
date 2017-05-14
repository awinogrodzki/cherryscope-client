import { DISCOVER_MOVIES } from '../actions/types';

const initialState = {
  items: [],
  page: 1,
  pageCount: null,
  itemCount: null,
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
  default:
    return state;
  }
}
