import React from 'react';
import PropTypes from 'prop-types';
import movieService from 'services/movie';
import styles from './MovieList.css';
import Movie from './Movie';

const renderLoading = (isLoading) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.loading} />
  );
};

const renderMovies = movies => movies.map(item => (
  <Movie
    className={styles.movie}
    key={item.id}
    title={item.title}
    originalTitle={item.original_title}
    imageUrl={movieService.getImageUrl(item.poster_path)}
    voteAverage={item.vote_average}
    voteCount={item.vote_count}
    releaseDate={new Date(item.release_date)}
  />
));

const MovieList = ({ movies, isLoading }) => (
  <div className={styles.container}>
    { renderLoading(isLoading) }
    <div className={styles.wrapper}>
      { renderMovies(movies) }
    </div>
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
