import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from '../Image';
import { imageIdType } from './types';
import styles from './GalleryNav.css';

const renderImages = ({
  images,
  selectedImageId,
  onImageClick,
  imageClassName,
  selectedImageClass,
}) =>
  images.map(image => (
    <button
      className={classNames({
        [styles.imageContainer]: true,
        [imageClassName]: true,
        [selectedImageClass]: selectedImageId === image.id,
        [styles.isSelected]: selectedImageId === image.id,
      })}
      onClick={() => onImageClick(image.id)}
      key={image.id}
    >
      <Image
        className={classNames({
          [styles.image]: true,
        })}
        {...image}
      >
        <span className={styles.title}>{image.title}</span>
      </Image>
    </button>
  ));

const GalleryNav = ({
  images,
  selectedImageId,
  onImageClick,
  className,
  imageClassName,
  selectedImageClass,
}) => (
  <nav className={classNames(styles.container, className)}>
    {renderImages({
      images,
      selectedImageId,
      onImageClick,
      imageClassName,
      selectedImageClass,
    })}
  </nav>
);

GalleryNav.propTypes = {
  className: PropTypes.string,
  onImageClick: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.shape({
    id: imageIdType.isRequired,
    url: PropTypes.string,
    title: PropTypes.string,
  })),
  selectedImageId: imageIdType,
  imageClassName: PropTypes.string,
  selectedImageClass: PropTypes.string,
};

GalleryNav.defaultProps = {
  className: null,
  onImageClick: () => {},
  images: [],
  selectedImageId: null,
  imageClassName: null,
  selectedImageClass: null,
};

export default GalleryNav;
