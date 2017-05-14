import movieService from 'services/movie';
import { DISCOVER_MOVIES } from './types';

const discoverMovies = (filters) => dispatch => new Promise((resolve, reject) => {
  return movieService.discover(filters)
    .then((data) => {
      resolve(data);

      dispatch({
        type: DISCOVER_MOVIES,
        items: data.results,
        page: data.page,
        pageCount: data.total_pages,
        itemCount: data.total_results,
      });
    });
});

module.exports = { discoverMovies };
