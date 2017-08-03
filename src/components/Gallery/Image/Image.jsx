import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Image.css';

const Image = ({
  url,
  className,
  title,
  children,
}) => (
  <div
    title={title}
    className={classNames(styles.container, className)}
  >
    <img src={url} />
    { children &&
      <div className={styles.content}>
        { children }
      </div>
    }
  </div>
);

Image.propTypes = {
  children: PropTypes.node,
  url: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
};

Image.defaultProps = {
  children: null,
  title: null,
  className: null,
  url: '',
};

export default Image;
