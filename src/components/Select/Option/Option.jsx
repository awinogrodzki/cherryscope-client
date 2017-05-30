import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Option.css';

const Option = ({ index, option, onClick, getClass }) => (
  <div
    className={classNames(styles.container, getClass(index))}
    onClick={() => onClick(option)}
    role={'button'}
  >
    <span className={styles.label}>{option.label}</span>
  </div>
);

Option.propTypes = {
  index: PropTypes.number,
  getClass: PropTypes.func,
  onClick: PropTypes.func,
  option: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

Option.defaultProps = {
  index: 0,
  getClass: () => {},
  onClick: () => {},
};

export default Option;
