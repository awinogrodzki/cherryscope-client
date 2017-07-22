import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Loader from 'components/Loader';
import RatingBar from 'components/RatingBar';
import { t } from 'services/translate';
import styles from './Movie.css';

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.imageContainer = null;
  }

  onClick() {
    this.imageContainer && this.props.onClick(this.imageContainer);
  }

  renderImage(url) {
    if (!url) {
      return (
        <div
          data-test="Movie.emptyImage"
          className={styles.emptyImage}
        />
      );
    }

    return (
      <img data-test="Movie.image" src={url} />
    );
  }

  render() {
    return (
      <div
        className={classNames({
          [styles.container]: true,
          [this.props.className]: !!this.props.className,
        })}
      >
        <div
          className={styles.wrapper}
        >
          <div
            ref={element => this.imageContainer = element}
            data-test="Movie.imageContainer"
            className={styles.image}
            onClick={() => this.onClick()}
            role="button"
          >
            { this.props.isLoading && <Loader className={styles.loader} /> }
            { this.renderImage(this.props.imageUrl) }
          </div>
          <div className={styles.content}>
            <h2
              title={this.props.originalTitle}
              className={styles.originalTitle}
            >{ this.props.originalTitle }</h2>
            { this.props.originalTitle !== this.props.title
                && <h6 className={styles.title}>{ this.props.title }</h6> }
            <ul className={styles.data}>
              <li
                className={styles.dataItem}
              >
                <div className={styles.rating}>
                  <RatingBar
                    showValue
                    className={styles.ratingBar}
                    value={this.props.voteAverage}
                    maxValue={10}
                  />
                </div>
              </li>
              <li className={styles.dataItem}><strong>{this.props.voteCount} {t('movie.votes')}</strong></li>
              {
                this.props.releaseDate !== null &&
                <li className={styles.dataItem}>{t('movie.releaseDate')} <strong>{this.props.releaseDate.toLocaleDateString()}</strong></li>
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Movie.propTypes = {
  title: PropTypes.string,
  originalTitle: PropTypes.string,
  imageUrl: PropTypes.string,
  voteAverage: PropTypes.number,
  voteCount: PropTypes.number,
  releaseDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

Movie.defaultProps = {
  title: null,
  originalTitle: null,
  imageUrl: null,
  voteAverage: null,
  voteCount: null,
  releaseDate: null,
  className: null,
  isLoading: false,
  onClick: () => {},
};

export default Movie;
