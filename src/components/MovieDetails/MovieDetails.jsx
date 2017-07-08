import React from 'react';
import IMDBLogo from 'resources/images/imdb_logo.svg';
import { MovieDetailsPropTypes } from './types';
import styles from './MovieDetails.css';

const renderLoading = (isLoading) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.loading}>
      Loading...
    </div>
  );
};

const MovieDetails = ({
  originalTitle,
  title,
  imdbUrl,
  overview,
  isLoading,
  image,
}) => (
  <article className={styles.container}>
    { image &&
      <div className={styles.image}>
        <img src={image} />
      </div>
    }
    <div className={styles.wrapper}>
      { renderLoading(isLoading) }
      <div className={styles.titleContainer}>
        <h2 className={styles.originalTitle}>{originalTitle}</h2>
        { title !== originalTitle && <span className={styles.title}>{title}</span> }
      </div>
      <div className={styles.row}>
        {overview}
      </div>
      {
        imdbUrl &&
        <a rel="noopener noreferrer" href={imdbUrl} target="_blank" className={styles.iconLink}>
          <IMDBLogo />
        </a>
      }
    </div>
  </article>
);

MovieDetails.propTypes = MovieDetailsPropTypes;

MovieDetails.defaultProps = {
  originalTitle: null,
  title: null,
  imdbUrl: null,
  overview: null,
  isLoading: false,
  image: null,
};

export default MovieDetails;
