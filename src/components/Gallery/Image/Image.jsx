import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { imageIdType } from './types';
import styles from './Image.css';

const Image = ({
  id,
  url,
  onClick,
  className,
}) => (
  <button onClick={() => onClick(id)} className={classNames(styles.container, className)}>
    <img src={url} />
  </button>
);

Image.propTypes = {
  id: imageIdType.isRequired,
  url: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Image.defaultProps = {
  className: null,
  url: '',
  onClick: () => {},
};

export default Image;
