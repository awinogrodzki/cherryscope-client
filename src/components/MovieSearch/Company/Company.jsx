import React from 'react';
import PropTypes from 'prop-types';
import styles from './Company.css';

const renderImage = (url) => {
  if (!url) {
    return null;
  }

  return (
    <div data-test="Company.image" className={styles.image}>
      <img src={url} />
    </div>
  );
};

const Company = ({ name, imageUrl }) => (
  <div className={styles.container}>
    { renderImage(imageUrl) }
    <div className={styles.content}>
      <div className={styles.name}>
        { name }
      </div>
    </div>
  </div>
);

Company.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
};
Company.defaultProps = {
  name: null,
  imageUrl: null,
};

export default Company;
