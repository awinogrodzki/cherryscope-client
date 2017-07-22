import { get } from 'lodash';
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
  GET_MOVIE,
} from './types';

const mapDirectors = response =>
  get(response, 'credits.crew', [])
  .filter(item => item.job === 'Director');
const mapWriters = response =>
  get(response, 'credits.crew', [])
  .filter(item => item.job === 'Writer' || item.job === 'Screenplay');
const mapCast = response => get(response, 'credits.cast', []).slice(0, 10);

const discoverMovies = (filters, append = false) =>
  (dispatch, getState) => movieService.discover(filters)
    .then((data) => {
      const currentMovies = get(getState(), 'movies.items');

      dispatch({
        type: DISCOVER_MOVIES,
        items: append ? currentMovies.concat(data.results) : data.results,
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

const getMovie = id => dispatch => movieService.getMovie(id)
  .then((data) => {
    dispatch({
      type: GET_MOVIE,
      details: {
        id: data.id,
        overview: data.overview,
        imdbId: data.imdb_id,
        image: movieService.getImageUrl(data.poster_path),
        originalTitle: data.original_title,
        title: data.title,
        genres: data.genres,
        voteCount: data.vote_count,
        voteAverage: data.vote_average,
        directors: mapDirectors(data),
        writers: mapWriters(data),
        cast: mapCast(data),
      },
    });

    return data;
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
  getMovie,
};
