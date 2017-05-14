import movieService from 'services/movie';
import { DISCOVER_MOVIES, GET_GENRES } from './types';

const discoverMovies = filters => dispatch => (
  new Promise(resolve => movieService.discover(filters)
    .then((data) => {
      resolve(data);

      dispatch({
        type: DISCOVER_MOVIES,
        items: data.results,
        page: data.page,
        pageCount: data.total_pages,
        itemCount: data.total_results,
      });
    }))
);

const getGenres = () => dispatch => (
  new Promise(resolve => movieService.getGenres()
    .then((data) => {
      resolve(data);

      dispatch({
        type: GET_GENRES,
        genres: data.genres,
      });
    }))
);

module.exports = { discoverMovies, getGenres };
