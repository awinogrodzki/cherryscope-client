import React from 'react';
import PropTypes from 'prop-types';
import movieService from 'services/movie';
import styles from './MovieOptions.css';
import { movieType } from '../MovieList/types';

const renderImage = (url) => {
  if (!url) {
    return <div className={styles.emptyImage} />;
  }

  return (
    <img src={url} />
  );
};

const MovieOptions = ({
  movies,
  onMovieClick,
}) => (
  <button onClick={onMovieClick} className={styles.container}>
    { movies.map(movie => (
      <div className={styles.movie} key={movie.id}>
        <div className={styles.image}>
          {renderImage(movieService.getImageUrl(movie.poster_path, 160))}
        </div>
      </div>
    )) }
  </button>
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
