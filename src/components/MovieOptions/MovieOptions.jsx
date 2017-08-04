import React from 'react';
import PropTypes from 'prop-types';
import { movieType } from '../MovieList/types';

const MovieOptions = () => (
  <div>Movie Options</div>
);

MovieOptions.propTypes = {
  movies: PropTypes.arrayOf(movieType),
  onMovieClick: PropTypes.func,
};

MovieOptions.defaultProps = {
  movies: [],
  onMovieClick: () => {},
};

export default MovieOptions;
