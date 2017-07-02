import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { t } from 'services/translate';
import styles from './Movie.css';

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.container = null;
  }

  setContainer(container) {
    this.container = container;
  }

  onClick() {
    this.container && this.props.onClick(this.container);
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
        data-test="Movie.container"
        ref={container => this.setContainer(container)}
        className={classNames({
          [styles.container]: true,
          [styles.isExpanded]: !!this.props.isExpanded,
          [this.props.className]: !!this.props.className,
        })}
      >
        <div
          data-test="Movie.wrapper"
          className={styles.wrapper}
          onClick={() => this.onClick()}
          role="button"
        >
          <div className={styles.image}>
            { this.renderImage(this.props.imageUrl) }
          </div>
          <div className={styles.content}>
            <h4 className={styles.originalTitle}>{ this.props.originalTitle }</h4>
            { this.props.originalTitle !== this.props.title
                && <h6 className={styles.title}>{ this.props.title }</h6> }
            <ul className={styles.data}>
              <li className={styles.dataItem}>{`${t('movie.voteAverage')}:`} <strong>{this.props.voteAverage}</strong></li>
              <li className={styles.dataItem}><strong>{this.props.voteCount}</strong> {t('movie.voteCount')}</li>
              {
                this.props.releaseDate !== null &&
                <li className={styles.dataItem}>{t('movie.releaseDate')} <strong>{this.props.releaseDate.toLocaleDateString()}</strong></li>
              }
            </ul>
          </div>
          <div className={styles.details}>
            <div className={styles.detailsWrapper}>
              {this.props.detailsComponent}
            </div>
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
  isExpanded: PropTypes.bool,
  detailsComponent: PropTypes.node,
};

Movie.defaultProps = {
  title: null,
  originalTitle: null,
  imageUrl: null,
  voteAverage: null,
  voteCount: null,
  releaseDate: null,
  className: null,
  onClick: () => {},
  isExpanded: false,
  detailsComponent: null,
};

export default Movie;
