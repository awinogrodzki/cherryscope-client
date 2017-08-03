import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from '../Image';
import styles from './GalleryView.css';
import { imageIdType } from '../GalleryNav/types';

const renderImages = (
  images,
  selectedImageId,
  onImageClick
) =>
  images.map(image =>
    (<Image
      onClick={onImageClick}
      className={classNames({
        [styles.image]: true,
        [styles.isSelected]: selectedImageId === image.id,
      })}
      key={image.id}
      {...image}
    />)
  );

const GalleryView = ({
  images,
  selectedImageId,
  onImageClick,
}) => (
  <div className={styles.container}>
    {renderImages(images, selectedImageId, onImageClick)}
  </div>
);

GalleryView.propTypes = {
  onImageClick: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.shape({
    id: imageIdType.isRequired,
    url: PropTypes.string,
  })),
  selectedImageId: imageIdType,
};

GalleryView.defaultProps = {
  onImageClick: () => {},
  images: [],
  selectedImageId: null,
};

export default GalleryView;
