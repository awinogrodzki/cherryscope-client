import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import { imageProps } from './Image/types';
import styles from './Gallery.css';

const renderImages = images => images.map((image, index) => <Image key={index} {...image} />);

const Gallery = ({
  images,
}) => (
  <div className={styles.container}>
    {renderImages(images)}
  </div>
);

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape(imageProps)),
};

Gallery.defaultProps = {
  images: [],
};

export default Gallery;
