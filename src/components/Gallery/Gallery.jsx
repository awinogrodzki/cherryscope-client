import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import { imageProps } from './Image/types';
import styles from './Gallery.css';

const renderImages = (images, onImageClick) =>
  images.map((image, index) => <Image onClick={onImageClick} key={index} {...image} />);

const Gallery = ({
  images,
  onImageClick,
}) => (
  <div className={styles.container}>
    {renderImages(images, onImageClick)}
  </div>
);

Gallery.propTypes = {
  onImageClick: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.shape(imageProps)),
};

Gallery.defaultProps = {
  onImageClick: () => {},
  images: [],
};

export default Gallery;
