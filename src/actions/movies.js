import movieService from 'services/movie';
import {
  DISCOVER_MOVIES,
  GET_GENRES,
  SEARCH_KEYWORDS,
} from './types';

const discoverMovies = filters => dispatch => movieService.discover(filters)
  .then((data) => {
    dispatch({
      type: DISCOVER_MOVIES,
      items: data.results,
      page: data.page,
      pageCount: data.total_pages,
      itemCount: data.total_results,
    });

    return data;
  });

const getGenres = () => dispatch => movieService.getGenres()
  .then((data) => {
    dispatch({
      type: GET_GENRES,
      genres: data.genres,
    });

    return data;
  });

const searchKeywords = query => dispatch => movieService.searchKeywords(query)
  .then((data) => {
    dispatch({
      type: SEARCH_KEYWORDS,
      items: data.results,
    });

    return data;
  });

module.exports = { discoverMovies, getGenres, searchKeywords };
