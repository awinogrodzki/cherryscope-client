import React from 'react';
import styles from './Movie.css';

const renderImage = (url) => {
  if (!url) {
    return <div className={styles.emptyImage} />;
  }

  return (
    <img src={url} />
  );
};

const Movie = ({ imageUrl }) => (
  <div className={styles.container}>
    <div className={styles.image}>
      { renderImage(imageUrl) }
    </div>
  </div>
);

export default Movie;
