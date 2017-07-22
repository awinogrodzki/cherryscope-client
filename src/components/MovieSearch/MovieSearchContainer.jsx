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
    companies={props.companies}
    genres={props.genres}
    people={props.people}
    keywords={props.keywords}
    onChange={values => props.onChange(values)}
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
};

 /* istanbul ignore next */
const mapStateToProps = state => ({
  people: state.movies.people,
  genres: state.movies.genres,
  keywords: state.movies.keywords,
  companies: state.movies.companies,
});

MovieSearchContainer.propTypes = {
  onChange: PropTypes.func,
  getGenres: PropTypes.func.isRequired,
  searchKeywords: PropTypes.func.isRequired,
  clearKeywords: PropTypes.func.isRequired,
  searchPeople: PropTypes.func.isRequired,
  clearPeople: PropTypes.func.isRequired,
  searchCompanies: PropTypes.func.isRequired,
  clearCompanies: PropTypes.func.isRequired,
  people: PropTypes.arrayOf(PropTypes.object),
  genres: PropTypes.arrayOf(PropTypes.object),
  companies: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.object),
};

MovieSearchContainer.defaultProps = {
  onChange: () => {},
  genres: [],
  people: [],
  keywords: [],
  companies: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchContainer);
