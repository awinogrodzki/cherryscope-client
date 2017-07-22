import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './RatingBar.css';

const getStyle = (value, maxValue, minValue) => {
  const length = maxValue - minValue;
  const progress = `${value / length * 100}%`;

  return { width: progress };
};

const RatingBar = ({
  className,
  value,
  maxValue,
  minValue,
  showValue,
  title,
}) => (
  <div className={classNames(styles.container, className)}>
    { title &&
      <div data-test="RatingBar.title" className={styles.title}>
        <span>{title}</span>
      </div>
    }
    <div className={styles.wrapper}>
      <div
        data-test="RatingBar.progressBarContainer"
        className={styles.progressBarContainer}
      >
        <div
          style={getStyle(value, maxValue, minValue)}
          data-test="RatingBar.progressBar"
          className={styles.progressBar}
        />
      </div>
      { showValue &&
        <div
          data-test="RatingBar.value"
          className={styles.value}
        >
          <span>{value}/{maxValue}</span>
        </div>
      }
    </div>
  </div>
);

RatingBar.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  showValue: PropTypes.bool,
  title: PropTypes.string,
};

RatingBar.defaultProps = {
  className: null,
  value: 0,
  maxValue: 1,
  minValue: 0,
  showValue: true,
  title: null,
};

export default RatingBar;
