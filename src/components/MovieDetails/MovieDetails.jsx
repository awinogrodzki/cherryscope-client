import React from 'react';
import classNames from 'classnames';
import ArrowLeftIcon from 'react-icons/lib/ti/arrow-left';
import IMDBLogo from 'resources/images/imdb_logo.svg';
import RatingBar from 'components/RatingBar';
import Gallery, { GalleryNav } from 'components/Gallery';
import VideoGallery from 'components/VideoGallery';
import { t } from 'services/translate';
import { movieDetailsPropTypes } from './types';
import styles from './MovieDetails.css';

const renderLinks = (title, items) => {
  if (!items.length) {
    return null;
  }

  return (
    <div data-test="MovieDetails.links" className={classNames(styles.row, styles.links)}>
      <h4 className={styles.rowTitle}>{title}</h4>
      { items.map(item => (
        <a
          data-test="MovieDetails.link"
          key={item.id}
          className={styles.link}
        >{item.name}</a>
      )) }
    </div>
  );
};

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImageId: null,
      selectedVideoId: null,
      isGalleryVisible: false,
      isVideoGalleryVisible: false,
    };

    this.video = null;
    this.closeGallery = this.closeGallery.bind(this);
    this.onThumbnailClick = this.onThumbnailClick.bind(this);
    this.onVideoThumbnailClick = this.onVideoThumbnailClick.bind(this);
    this.onVideoReady = this.onVideoReady.bind(this);
  }

  closeGallery() {
    if (this.video && this.state.isVideoGalleryVisible) {
      this.video.pauseVideo();
    }

    this.setState({
      isGalleryVisible: false,
      isVideoGalleryVisible: false,
    });
  }

  onThumbnailClick(id) {
    this.setState({
      selectedImageId: id,
      isGalleryVisible: true,
      isVideoGalleryVisible: false,
    });
  }

  onVideoThumbnailClick(id) {
    this.setState({
      selectedVideoId: id,
      isVideoGalleryVisible: true,
      isGalleryVisible: false,
    });
  }

  onVideoReady(event) {
    this.video = event.target;
  }

  getThumbnails() {
    return this.props.images.map(({ id, thumbnailUrl: url }) => ({ id, url }));
  }

  getVideoThumbnails() {
    return this.props.videos.map(({ id, key, name }) => ({
      id,
      url: `https://img.youtube.com/vi/${key}/mqdefault.jpg`,
      title: name,
    }));
  }

  renderGallery() {
    if (!this.props.images.length) {
      return null;
    }

    return (
      <Gallery
        className={styles.gallery}
        data-test="MovieDetails.imageGallery"
        selectedImageId={this.state.selectedImageId}
        images={this.props.images}
        onThumbnailClick={this.onThumbnailClick}
        thumbnails={this.getThumbnails()}
        navClassName={styles.galleryNav}
      />
    );
  }

  renderVideoGallery() {
    if (!this.props.videos.length) {
      return null;
    }

    return (
      <VideoGallery
        className={styles.videoGallery}
        data-test="MovieDetails.videoGallery"
        selectedVideoId={this.state.selectedVideoId}
        videos={this.props.videos}
        onThumbnailClick={this.onVideoThumbnailClick}
        thumbnails={this.getVideoThumbnails()}
        navClassName={styles.galleryNav}
        onVideoReady={this.onVideoReady}
      />
    );
  }

  render() {
    return (
      <article
        className={classNames({
          [styles.container]: true,
          [styles.isGalleryVisible]: this.state.isGalleryVisible,
          [styles.isVideoGalleryVisible]: this.state.isVideoGalleryVisible,
        })}
      >
        <div
          className={styles.wrapper}
        >
          <div
            className={styles.galleryContainer}
          >
            <button
              data-test="MovieDetails.galleryCloseButton"
              className={styles.back}
              onClick={this.closeGallery}
            >
              <ArrowLeftIcon />
            </button>
            { this.renderGallery() }
            { this.renderVideoGallery() }
          </div>
          <div className={styles.detailsContainer}>
            { this.props.image &&
            <div data-test="MovieDetails.image" className={styles.image}>
              <img src={this.props.image} />
            </div>
              }
            <div className={styles.contentWrapper}>
              <div className={styles.titleContainer}>
                <h2 className={styles.originalTitle}>{this.props.originalTitle}</h2>
                { this.props.title !== this.props.originalTitle &&
                  <span
                    data-test="MovieDetails.title"
                    className={styles.title}
                  >
                    {this.props.title}
                  </span>
                }
              </div>
              <div className={classNames(styles.row, styles.content)}>
                {this.props.overview}
              </div>
              { this.props.images.length &&
              <div className={styles.row}>
                <GalleryNav
                  data-test="MovieDetails.imageGalleryNav"
                  selectedImageId={this.state.selectedImageId}
                  images={this.getThumbnails()}
                  onImageClick={this.onThumbnailClick}
                />
              </div> }
              { this.props.videos.length &&
              <div className={styles.row}>
                <GalleryNav
                  data-test="MovieDetails.videoGalleryNav"
                  selectedImageId={this.state.selectedVideoId}
                  images={this.getVideoThumbnails()}
                  imageClassName={styles.videoThumbnail}
                  onImageClick={this.onVideoThumbnailClick}
                />
              </div> }
              <div className={styles.ratingBar}>
                <RatingBar
                  title={t('movieDetails.rating')}
                  value={this.props.voteAverage}
                  maxValue={10}
                />
                <span className={styles.votes}><strong>{this.props.voteCount}</strong> {t('movieDetails.votes')}</span>
              </div>
              {
                  this.props.imdbUrl &&
                  <a
                    data-test="MovieDetails.imdbUrl"
                    rel="noopener noreferrer"
                    href={this.props.imdbUrl}
                    target="_blank"
                    className={styles.iconLink}
                  >
                    <IMDBLogo />
                  </a>
                }
              {renderLinks(t('movies.genres'), this.props.genres)}
              {renderLinks(t('movieDetails.directors'), this.props.directors)}
              {renderLinks(t('movieDetails.writers'), this.props.writers)}
              {renderLinks(t('movieDetails.cast'), this.props.cast)}
            </div>
          </div>
        </div>
      </article>
    );
  }
}

MovieDetails.propTypes = movieDetailsPropTypes;

MovieDetails.defaultProps = {
  originalTitle: null,
  title: null,
  imdbUrl: null,
  overview: null,
  image: null,
  voteAverage: 0,
  voteCount: 0,
  genres: [],
  directors: [],
  writers: [],
  cast: [],
  images: [],
  videos: [],
};

export default MovieDetails;
