import movieService from 'services/movie';
import {
  DISCOVER_MOVIES,
  GET_GENRES,
  SEARCH_KEYWORDS,
  CLEAR_KEYWORDS,
  SEARCH_PEOPLE,
  CLEAR_PEOPLE,
  SEARCH_COMPANIES,
  CLEAR_COMPANIES,
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
      keywords: data.results,
    });

    return data;
  });

const clearKeywords = () => ({
  type: CLEAR_KEYWORDS,
});

const searchPeople = query => dispatch => movieService.searchPeople(query)
  .then((data) => {
    dispatch({
      type: SEARCH_PEOPLE,
      people: data.results,
    });

    return data;
  });

const clearPeople = () => ({
  type: CLEAR_PEOPLE,
});

const searchCompanies = query => dispatch => movieService.searchCompanies(query)
  .then((data) => {
    dispatch({
      type: SEARCH_COMPANIES,
      companies: data.results,
    });

    return data;
  });

const clearCompanies = () => ({
  type: CLEAR_COMPANIES,
});

module.exports = {
  discoverMovies,
  getGenres,
  searchKeywords,
  clearKeywords,
  searchPeople,
  clearPeople,
  searchCompanies,
  clearCompanies,
};
