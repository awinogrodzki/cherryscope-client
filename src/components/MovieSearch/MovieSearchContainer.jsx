import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getGenres,
  searchKeywords,
  clearKeywords,
  searchPeople,
  clearPeople,
} from 'actions';
import MovieSearch from './MovieSearch';

const MovieSearchContainer = props => (
  <MovieSearch
    getGenres={props.getGenres}
    searchKeywords={props.searchKeywords}
    clearKeywords={props.clearKeywords}
    searchPeople={props.searchPeople}
    clearPeople={props.clearPeople}
    genres={props.genres}
    people={props.people}
    keywords={props.keywords}
    onChange={values => props.onChange(values)}
  />
);

const mapDispatchToProps = {
  searchKeywords: value => searchKeywords(value),
  getGenres: () => getGenres(),
  clearKeywords: () => clearKeywords(),
  searchPeople: value => searchPeople(value),
  clearPeople: () => clearPeople(),
};

const mapStateToProps = state => ({
  people: state.movies.people,
  genres: state.movies.genres,
  keywords: state.movies.keywords,
});

MovieSearchContainer.propTypes = {
  onChange: PropTypes.func,
  getGenres: PropTypes.func.isRequired,
  searchKeywords: PropTypes.func.isRequired,
  clearKeywords: PropTypes.func.isRequired,
  searchPeople: PropTypes.func.isRequired,
  clearPeople: PropTypes.func.isRequired,
  people: PropTypes.arrayOf(PropTypes.object),
  genres: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.object),
};

MovieSearchContainer.defaultProps = {
  onChange: () => {},
  genres: [],
  people: [],
  keywords: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchContainer);
