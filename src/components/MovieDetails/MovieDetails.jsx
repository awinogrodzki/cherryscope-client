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
}) => (
  <div className={styles.container}>
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
);

MovieDetails.propTypes = {
  imdbUrl: PropTypes.string,
  overview: PropTypes.string,
  isLoading: PropTypes.bool,
};

MovieDetails.defaultProps = {
  imdbUrl: null,
  overview: null,
  isLoading: false,
};

export default MovieDetails;
