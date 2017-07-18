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

const renderGenres = genres => (
  <div className={styles.genresContainer}>
    <h4 className={styles.rowTitle}>{t('movies.genres')}</h4>
    { genres.map(genre => (
      <div key={genre.id} className={classNames(styles.badge, styles.genreBadge)}>
        <span>{genre.name}</span>
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
      <div className={classNames(styles.row, styles.content)}>
        {overview}
      </div>
      {
        imdbUrl &&
        <a rel="noopener noreferrer" href={imdbUrl} target="_blank" className={styles.iconLink}>
          <IMDBLogo />
        </a>
      }
      <div className={styles.row}>
        {renderGenres(genres)}
      </div>
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
};

export default MovieDetails;
