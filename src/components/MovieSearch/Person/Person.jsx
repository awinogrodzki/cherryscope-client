import React from 'react';
import PropTypes from 'prop-types';
import styles from './Person.css';

const renderImage = (url) => {
  if (!url) {
    return null;
  }

  return (
    <div data-test="Person.image" className={styles.image}>
      <img src={url} />
    </div>
  );
};

const renderTags = tags => (
  <div className={styles.tags}>
    { tags.map((tag, index) => (
      tag && tag.label && <span
        key={index}
        className={styles.tag}
        data-test="Person.tag"
      >
        {tag.label}
      </span>
    )) }
  </div>
);

const Person = ({ name, imageUrl, tags }) => (
  <div className={styles.container}>
    { renderImage(imageUrl) }
    <div className={styles.content}>
      <div className={styles.name}>
        { name }
      </div>
      { renderTags(tags) }
    </div>
  </div>
);

Person.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
  })),
};

Person.defaultProps = {
  name: null,
  imageUrl: null,
  tags: [],
};

export default Person;
