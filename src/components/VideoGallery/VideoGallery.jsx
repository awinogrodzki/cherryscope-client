import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get } from 'lodash';
import YouTube from 'react-youtube';
import { GalleryNav } from 'components/Gallery';
import styles from './VideoGallery.css';

const renderVideo = (video, onVideoReady) => {
  if (!video || video.site !== 'YouTube') {
    return null;
  }

  const options = {
    width: '100%',
    height: '100%',
  };

  return (
    <YouTube
      data-test="VideoGallery.video"
      className={styles.video}
      opts={options}
      id={video.id}
      videoId={video.key}
      onReady={onVideoReady}
    />
  );
};

const VideoGallery = ({
  videos,
  thumbnails,
  selectedVideoId,
  onThumbnailClick,
  navClassName,
  onVideoReady,
}) => (
  <div className={styles.container}>
    { selectedVideoId &&
      renderVideo(
        get(videos.filter(video => video.id === selectedVideoId), 0),
        onVideoReady
      ) }
    <GalleryNav
      className={classNames(styles.nav, navClassName)}
      imageClassName={styles.thumbnail}
      selectedImageClass={styles.isSelected}
      selectedImageId={selectedVideoId}
      images={thumbnails}
      onImageClick={onThumbnailClick}
    />
  </div>
);

VideoGallery.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    name: PropTypes.string,
    site: PropTypes.string,
  })),
  thumbnails: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string,
    title: PropTypes.string,
  })),
  selectedVideoId: PropTypes.string,
  onThumbnailClick: PropTypes.func,
  navClassName: PropTypes.string,
  onVideoReady: PropTypes.func,
};

VideoGallery.defaultProps = {
  videos: [],
  thumbnails: [],
  selectedVideoId: null,
  onThumbnailClick: () => {},
  onVideoReady: () => {},
  navClassName: null,
};

export default VideoGallery;
