import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Option.css';

const Option = ({ index, option, onClick, getClass, getElement }) => (
  <div
    ref={element => element && getElement(element, index)}
    className={classNames(styles.container, getClass(index))}
    onMouseDown={() => onClick(option)}
    role={'button'}
  >
    {option && option.customComponent || <span className={styles.label}>{option.label}</span>}
  </div>
  );

Option.propTypes = {
  index: PropTypes.number,
  getElement: PropTypes.func,
  getClass: PropTypes.func,
  onClick: PropTypes.func,
  option: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    customComponent: PropTypes.node,
  }).isRequired,
};

Option.defaultProps = {
  index: 0,
  getElement: () => {},
  getClass: () => {},
  onClick: () => {},
};

export default Option;
