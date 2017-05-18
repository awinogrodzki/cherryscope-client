import React from 'react';
import PropTypes from 'prop-types';
import styles from './Option.css';

const Option = ({ option, onClick }) => (
  <div
    className={styles.container}
    onMouseDown={() => onClick(option)}
    onTouchStart={() => onClick(option)}
    role={'button'}
  >
    <span className={styles.label}>{option.label}</span>
  </div>
);

Option.propTypes = {
  onClick: PropTypes.func,
  option: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
  }).isRequired,
};

Option.defaultProps = {
  onClick: () => {},
};

export default Option;
