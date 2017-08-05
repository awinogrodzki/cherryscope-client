import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getGenres,
  searchKeywords,
  clearKeywords,
  searchPeople,
  clearPeople,
  searchCompanies,
  clearCompanies,
  searchMovies,
  clearMovies,
} from 'actions';
import MovieSearch from './MovieSearch';

 /* istanbul ignore next */
const MovieSearchContainer = props => (
  <MovieSearch
    getGenres={props.getGenres}
    searchKeywords={props.searchKeywords}
    clearKeywords={props.clearKeywords}
    searchPeople={props.searchPeople}
    clearPeople={props.clearPeople}
    searchCompanies={props.searchCompanies}
    clearCompanies={props.clearCompanies}
    searchMovies={props.searchMovies}
    clearMovies={props.clearMovies}
    movies={props.movies}
    companies={props.companies}
    genres={props.genres}
    people={props.people}
    keywords={props.keywords}
    onChange={values => props.onChange(values)}
    onMovieClick={props.onMovieClick}
    ignoreInputBlur={props.ignoreInputBlur}
    isExpanded={props.isExpanded}
  />
);

 /* istanbul ignore next */
const mapDispatchToProps = {
  searchKeywords: value => searchKeywords(value),
  getGenres: () => getGenres(),
  clearKeywords: () => clearKeywords(),
  searchPeople: value => searchPeople(value),
  clearPeople: () => clearPeople(),
  searchCompanies: value => searchCompanies(value),
  clearCompanies: () => clearCompanies(),
  searchMovies: value => searchMovies(value),
  clearMovies: () => clearMovies(),
};

 /* istanbul ignore next */
const mapStateToProps = state => ({
  people: state.movies.people,
  genres: state.movies.genres,
  keywords: state.movies.keywords,
  companies: state.movies.companies,
  movies: state.movies.searchMovies,
});

MovieSearchContainer.propTypes = {
  onMovieClick: PropTypes.func,
  onChange: PropTypes.func,
  getGenres: PropTypes.func.isRequired,
  searchKeywords: PropTypes.func.isRequired,
  clearKeywords: PropTypes.func.isRequired,
  searchPeople: PropTypes.func.isRequired,
  clearPeople: PropTypes.func.isRequired,
  searchCompanies: PropTypes.func.isRequired,
  clearCompanies: PropTypes.func.isRequired,
  searchMovies: PropTypes.func.isRequired,
  clearMovies: PropTypes.func.isRequired,
  people: PropTypes.arrayOf(PropTypes.object),
  genres: PropTypes.arrayOf(PropTypes.object),
  companies: PropTypes.arrayOf(PropTypes.object),
  movies: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.object),
  ignoreInputBlur: PropTypes.bool,
  isExpanded: PropTypes.bool,
};

MovieSearchContainer.defaultProps = {
  isExpanded: false,
  ignoreInputBlur: false,
  onMovieClick: () => {},
  onChange: () => {},
  genres: [],
  people: [],
  keywords: [],
  companies: [],
  movies: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchContainer);
