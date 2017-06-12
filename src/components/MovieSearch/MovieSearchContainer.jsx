import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGenres, searchKeywords, clearKeywords } from 'actions';
import MovieSearch from './MovieSearch';

const MovieSearchContainer = props => (
  <MovieSearch
    getGenres={props.getGenres}
    searchKeywords={props.searchKeywords}
    clearKeywords={props.clearKeywords}
    genres={props.genres}
    keywords={props.keywords}
    onChange={values => props.onChange(values)}
  />
);

const mapDispatchToProps = {
  searchKeywords: value => searchKeywords(value),
  getGenres: () => getGenres(),
  clearKeywords: () => clearKeywords(),
};

const mapStateToProps = state => ({
  genres: state.movies.genres,
  keywords: state.movies.keywords,
});

MovieSearchContainer.propTypes = {
  onChange: PropTypes.func,
  getGenres: PropTypes.func.isRequired,
  searchKeywords: PropTypes.func.isRequired,
  clearKeywords: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.object),
};

MovieSearchContainer.defaultProps = {
  onChange: () => {},
  genres: [],
  keywords: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchContainer);
