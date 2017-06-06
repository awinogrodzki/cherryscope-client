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

  return movies.map(item => (
    <Movie
      key={item.id}
      title={item.title}
      originalTitle={item.original_title}
      imageUrl={movieService.getImageUrl(item.backdrop_path)}
      voteAverage={item.vote_average}
      voteCount={item.vote_count}
      releaseDate={new Date(item.release_date)}
    />
  ));
};

const MovieList = ({ movies, isLoading }) => (
  <div className={styles.container}>
    { renderMovies(movies, isLoading) }
  </div>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

MovieList.defaultProps = {
  movies: [],
  isLoading: false,
};

export default MovieList;
