import React from 'react';
import PropTypes from 'prop-types';
import GalleryView from './GalleryView';
import GalleryNav from './GalleryNav';
import styles from './Gallery.css';
import { imageIdType } from './Image/types';

const Gallery = ({
  images,
  thumbnails,
  selectedImageId,
  onImageClick,
}) => (
  <div className={styles.container}>
    <GalleryView selectedImageId={selectedImageId} images={images} />
    { thumbnails.length &&
      <GalleryNav
        selectedImageId={selectedImageId}
        images={thumbnails}
        onImageClick={onImageClick}
      />
    }
  </div>
);

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: imageIdType.isRequired,
    url: PropTypes.string,
  })),
  thumbnails: PropTypes.arrayOf(PropTypes.shape({
    id: imageIdType.isRequired,
    url: PropTypes.string,
  })),
  selectedImageId: imageIdType,
  onImageClick: PropTypes.func,
};

Gallery.defaultProps = {
  images: [],
  thumbnails: [],
  selectedImageId: null,
  onImageClick: () => {},
};

export default Gallery;
