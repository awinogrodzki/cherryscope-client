import React from 'react';
import PropTypes from 'prop-types';
import styles from './Person.css';

const renderImage = (image) => {
  if (!image) {
    return null;
  }

  return (
    <div data-test="Person.image" className={styles.image}>
      <img src={image} />
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

const Person = ({ name, image, tags }) => (
  <div className={styles.container}>
    { renderImage(image) }
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
  image: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
  })),
};

Person.defaultProps = {
  name: null,
  image: null,
  tags: [],
};

export default Person;
