import React from 'react';
import PropTypes from 'prop-types';
import Radio from 'components/Radio';
import { t } from 'services/translate';
import styles from './MovieSort.css';

const options = [
  {
    value: 'popularity.desc',
    label: t('movies.sort.popularity.desc'),
  },
  {
    value: 'popularity.asc',
    label: t('movies.sort.popularity.asc'),
  },
  {
    value: 'release_date.desc',
    label: t('movies.sort.releaseDate.desc'),
  },
  {
    value: 'release_date.asc',
    label: t('movies.sort.releaseDate.asc'),
  },
  {
    value: 'primary_release_date.desc',
    label: t('movies.sort.primaryReleaseDate.desc'),
  },
  {
    value: 'primary_release_date.asc',
    label: t('movies.sort.primaryReleaseDate.asc'),
  },
  {
    value: 'vote_count.desc',
    label: t('movies.sort.voteCount.desc'),
  },
  {
    value: 'vote_count.asc',
    label: t('movies.sort.voteCount.asc'),
  },
  {
    value: 'vote_average.desc',
    label: t('movies.sort.voteAverage.desc'),
  },
  {
    value: 'vote_average.asc',
    label: t('movies.sort.voteAverage.asc'),
  },
];

const MovieSort = ({ onChange, value }) => (
  <div className={styles.container}>
    <Radio onChange={onChange} value={value || 'popularity.desc'} options={options} />
  </div>
  );

MovieSort.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

MovieSort.defaultProps = {
  value: null,
  onChange: () => {},
};

export default MovieSort;
