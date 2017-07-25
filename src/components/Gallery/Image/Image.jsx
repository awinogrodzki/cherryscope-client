import React from 'react';
import { imageProps } from './types';
import styles from './Image.css';

const Image = ({
  id,
  url,
  onClick,
}) => (
  <button onClick={onClick(id)} className={styles.container}>
    <img src={url} />
  </button>
);

Image.propTypes = imageProps;

Image.defaultProps = {
  url: '',
  onClick: () => {},
};

export default Image;
