import React from 'react';
import PropTypes from 'prop-types';
import styles from './Company.css';

const renderImage = (image) => {
  if (!image) {
    return null;
  }

  return (
    <div data-test="Company.image" className={styles.image}>
      <img src={image} />
    </div>
  );
};

const Company = ({ name, image }) => (
  <div className={styles.container}>
    { renderImage(image) }
    <div className={styles.content}>
      <div className={styles.name}>
        { name }
      </div>
    </div>
  </div>
);

Company.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
};
Company.defaultProps = {
  name: null,
  image: null,
};

export default Company;
