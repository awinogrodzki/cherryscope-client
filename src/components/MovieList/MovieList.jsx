import React from 'react';
import PropTypes from 'prop-types';
import movieService from 'services/movie';
import styles from './MovieList.css';
import Movie from './Movie';

const renderMovies = (movies, isLoading) => {
  if (isLoading) {
    return (
      <div>is loading...</div>
    );
  }

  return movies.map((item, index) => {
    return (
      <Movie
        key={index}
        imageUrl={movieService.getImageUrl(item.backdrop_path)}
      />
    );
  });
};

const MovieList = ({ movies, isLoading }) => (
  <div className={styles.container}>
    { renderMovies(movies, isLoading) }
  </div>
);

MovieList.propTypes = {
  movies: PropTypes.array,
  isLoading: PropTypes.boolean,
};

MovieList.defaultProps = {
  movies: [],
  isLoading: true,
};

export default MovieList;
