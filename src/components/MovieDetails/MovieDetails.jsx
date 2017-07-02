import React from 'react';
import PropTypes from 'prop-types';
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
  overview,
  isLoading,
}) => (
  <div className={styles.container}>
    { renderLoading(isLoading) }
    {overview}
  </div>
);

MovieDetails.propTypes = {
  overview: PropTypes.string,
  isLoading: PropTypes.bool,
};

MovieDetails.defaultProps = {
  overview: null,
  isLoading: false,
};

export default MovieDetails;
