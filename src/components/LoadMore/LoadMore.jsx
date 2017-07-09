import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'services/translate';
import styles from './LoadMore.css';

const LoadMore = ({ label, page, onChange, isLoading }) => (
  <div className={styles.container}>
    <button className={styles.button} onClick={() => onChange(page + 1)}>
      { isLoading ? t('movies.loading') : label }
    </button>
  </div>
);

LoadMore.propTypes = {
  label: PropTypes.string,
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
};

LoadMore.defaultProps = {
  label: 'Load more',
  onChange: () => {},
  isLoading: false,
};

export default LoadMore;
