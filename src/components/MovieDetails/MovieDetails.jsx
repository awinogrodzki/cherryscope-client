import React from 'react';
import PropTypes from 'prop-types';
import IMDBLogo from 'resources/images/imdb_logo.svg';
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
  imdbUrl,
  overview,
  isLoading,
  image,
}) => (
  <div className={styles.container}>
    { image &&
      <div className={styles.image}>
        <img src={image} />
      </div>
    }
    <div className={styles.wrapper}>
      { renderLoading(isLoading) }
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
  </div>
);

MovieDetails.propTypes = {
  imdbUrl: PropTypes.string,
  overview: PropTypes.string,
  isLoading: PropTypes.bool,
  image: PropTypes.string,
};

MovieDetails.defaultProps = {
  imdbUrl: null,
  overview: null,
  isLoading: false,
  image: null,
};

export default MovieDetails;
