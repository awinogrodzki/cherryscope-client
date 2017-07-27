import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from '../Image';
import styles from './GalleryView.css';
import { imageIdType } from '../Image/types';

const renderImages = (images, selectedImageId) =>
  images.map(image =>
    (<Image
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
}) => (
  <div className={styles.container}>
    {renderImages(images, selectedImageId)}
  </div>
);

GalleryView.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: imageIdType.isRequired,
    url: PropTypes.string,
  })),
  selectedImageId: imageIdType,
};

GalleryView.defaultProps = {
  images: [],
  selectedImageId: null,
};

export default GalleryView;
