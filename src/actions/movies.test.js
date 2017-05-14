import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { discoverMovies } from './movies';
import { DISCOVER_MOVIES } from './types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('services/movie', () => ({
  discover: () => Promise.resolve({
    results: [1, 2, 3],
    page: 1,
    total_pages: 10,
    total_results: 20,
  }),
}));

describe('movies actions', () => {
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
});
