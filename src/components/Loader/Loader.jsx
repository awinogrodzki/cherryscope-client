import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LoaderSvg from './images/loader.svg';
import styles from './Loader.css';

const Loader = ({ className }) => (
  <div className={classNames(styles.container, className)}>
    <LoaderSvg />
  </div>
);

Loader.propTypes = {
  className: PropTypes.string,
};

Loader.defaultProps = {
  className: null,
};

export default Loader;
