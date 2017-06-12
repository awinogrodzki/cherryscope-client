import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'services/translate';
import styles from './Movie.css';

const renderImage = (url) => {
  if (!url) {
    return (
      <div
        data-test="Movie.emptyImage"
        className={styles.emptyImage}
      />
    );
  }

  return (
    <img data-test="Movie.image" src={url} />
  );
};

const Movie = ({
  imageUrl,
  title,
  originalTitle,
  voteAverage,
  voteCount,
  releaseDate,
}) => (
  <div className={styles.container}>
    <div className={styles.image}>
      { renderImage(imageUrl) }
    </div>
    <div className={styles.content}>
      <h4 className={styles.originalTitle}>{ originalTitle }</h4>
      { originalTitle !== title && <h6 className={styles.title}>{ title }</h6> }
      <ul className={styles.data}>
        <li className={styles.dataItem}>{`${t('movie.voteAverage')}: ${voteAverage}`}</li>
        <li className={styles.dataItem}>{`${t('movie.voteCount')}: ${voteCount}`}</li>
        {
          releaseDate !== null &&
          <li className={styles.dataItem}>{`${t('movie.releaseDate')}: ${releaseDate.toLocaleDateString()}`}</li>
        }
      </ul>
    </div>
  </div>
);

Movie.propTypes = {
  title: PropTypes.string,
  originalTitle: PropTypes.string,
  imageUrl: PropTypes.string,
  voteAverage: PropTypes.number,
  voteCount: PropTypes.number,
  releaseDate: PropTypes.instanceOf(Date),
};

Movie.defaultProps = {
  title: null,
  originalTitle: null,
  imageUrl: null,
  voteAverage: null,
  voteCount: null,
  releaseDate: null,
};

export default Movie;
