import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GalleryView from './GalleryView';
import GalleryNav from './GalleryNav';
import styles from './Gallery.css';
import { imageIdType } from './Image/types';

const Gallery = ({
  images,
  thumbnails,
  selectedImageId,
  onImageClick,
  onThumbnailClick,
  navClassName,
}) => (
  <div className={styles.container}>
    <GalleryView
      selectedImageId={selectedImageId}
      onImageClick={onImageClick}
      images={images}
    />
    { thumbnails.length > 0 &&
      <GalleryNav
        className={classNames(styles.nav, navClassName)}
        imageClassName={styles.thumbnail}
        selectedImageClass={styles.isSelected}
        selectedImageId={selectedImageId}
        images={thumbnails}
        onImageClick={onThumbnailClick}
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
  onThumbnailClick: PropTypes.func,
  navClassName: PropTypes.string,
};

Gallery.defaultProps = {
  images: [],
  thumbnails: [],
  selectedImageId: null,
  onImageClick: () => {},
  onThumbnailClick: () => {},
  navClassName: null,
};

export default Gallery;
