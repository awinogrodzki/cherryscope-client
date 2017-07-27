import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from '../Image';
import { imageIdType } from '../Image/types';
import styles from './GalleryNav.css';

const renderImages = (images, selectedImageId, onImageClick) =>
  images.map(image =>
    (<Image
      className={classNames({
        [styles.image]: true,
        [styles.isSelected]: selectedImageId === image.id,
      })}
      onClick={onImageClick}
      key={image.id}
      {...image}
    />)
  );

const GalleryNav = ({
  images,
  selectedImageId,
  onImageClick,
}) => (
  <nav className={styles.container}>
    {renderImages(images, selectedImageId, onImageClick)}
  </nav>
);

GalleryNav.propTypes = {
  onImageClick: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.shape({
    id: imageIdType.isRequired,
    url: PropTypes.string,
  })),
  selectedImageId: imageIdType,
};

GalleryNav.defaultProps = {
  onImageClick: () => {},
  images: [],
  selectedImageId: null,
};

export default GalleryNav;
