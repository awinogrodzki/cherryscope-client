import React from 'react';
import Radio from 'components/Radio';
import { t } from 'services/translate';
import styles from './MovieSort.css';

const getOptions = () => [
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
    label: t('movies.sort.release_date.desc'),
  },
  {
    value: 'release_date.asc',
    label: t('movies.sort.release_date.asc'),
  },
  {
    value: 'primary_release_date.desc',
    label: t('movies.sort.primary_release_date.desc'),
  },
  {
    value: 'primary_release_date.asc',
    label: t('movies.sort.primary_release_date.asc'),
  },
  {
    value: 'vote_count.desc',
    label: t('movies.sort.vote_count.desc'),
  },
  {
    value: 'vote_count.asc',
    label: t('movies.sort.vote_count.asc'),
  },
  {
    value: 'vote_avarage.desc',
    label: t('movies.sort.vote_avarage.desc'),
  },
  {
    value: 'vote_avarage.asc',
    label: t('movies.sort.vote_avarage.asc'),
  },
];

const MovieSort = () => (
  <div className={styles.container}>
    <Radio value="popularity.desc" options={getOptions()} />
  </div>
);

export default MovieSort;
