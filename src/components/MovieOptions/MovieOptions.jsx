import React from 'react';
import PropTypes from 'prop-types';
import { movieType } from 'components/Movie';
import styles from './MovieOptions.css';

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
  <div
    className={styles.container}
  >
    { movies.map((movie) => {
      let movieElement = null;
      const setMovieElement = element => movieElement = element;

      return (
        <button
          ref={setMovieElement}
          onClick={() => onMovieClick(movie.id, movieElement)}
          className={styles.movie}
          key={movie.id}
        >
          <div className={styles.image}>
            {renderImage(movie.imageUrl)}
          </div>
        </button>
      );
    }) }
  </div>
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
