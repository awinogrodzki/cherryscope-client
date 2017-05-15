import React from 'react';
import PropTypes from 'prop-types';
import styles from './Movie.css';

const renderImage = (url) => {
  if (!url) {
    return (
      <div
        dataTest="Movie.emptyImage"
        className={styles.emptyImage}
      />
    );
  }

  return (
    <img dataTest="Movie.image" src={url} />
  );
};

const Movie = ({ imageUrl }) => (
  <div className={styles.container}>
    <div className={styles.image}>
      { renderImage(imageUrl) }
    </div>
  </div>
);

Movie.propTypes = {
  imageUrl: PropTypes.string,
};

export default Movie;
