import React from 'react';
import PropTypes from 'prop-types';
import styles from './LoadMore.css';

const LoadMore = ({ label, page, onChange }) => (
  <div className={styles.container}>
    <button className={styles.button} onClick={() => onChange(page + 1)}>
      { label }
    </button>
  </div>
);

LoadMore.propTypes = {
  label: PropTypes.string,
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

LoadMore.defaultProps = {
  label: 'Load more',
  onChange: () => {},
};

export default LoadMore;
