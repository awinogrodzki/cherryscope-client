import React from 'react';
import classNames from 'classnames';
import IMDBLogo from 'resources/images/imdb_logo.svg';
import { t } from 'services/translate';
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

const renderRow = (title, items) => (
  <div className={styles.row}>
    <h4 className={styles.rowTitle}>{title}</h4>
    { items.map(item => (
      <div key={item.id} className={styles.badge}>
        <span>{item.name}</span>
      </div>
    )) }
  </div>
);

const MovieDetails = ({
  originalTitle,
  title,
  imdbUrl,
  overview,
  isLoading,
  image,
  genres,
  directors,
  writers,
  cast,
}) => (
  <article className={styles.container}>
    { image &&
      <div className={styles.image}>
        <img src={image} />
      </div>
    }
    <div className={styles.wrapper}>
      {renderLoading(isLoading)}
      <div className={styles.titleContainer}>
        <h2 className={styles.originalTitle}>{originalTitle}</h2>
        { title !== originalTitle && <span className={styles.title}>{title}</span> }
      </div>
      <div className={classNames(styles.row, styles.content)}>
        {overview}
      </div>
      {
        imdbUrl &&
        <a rel="noopener noreferrer" href={imdbUrl} target="_blank" className={styles.iconLink}>
          <IMDBLogo />
        </a>
      }
      {renderRow(t('movies.genres'), genres)}
      {renderRow(t('movieDetails.directors'), directors)}
      {renderRow(t('movieDetails.writers'), writers)}
      {renderRow(t('movieDetails.cast'), cast)}
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
  genres: [],
  directors: [],
  writers: [],
  cast: [],
};

export default MovieDetails;
