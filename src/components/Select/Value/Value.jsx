import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Value.css';

const Value = ({ option, onDelete, getClass }) => (
  <div className={classNames(styles.container, getClass(option))}>
    <button
      data-test="Value.deleteButton"
      className={styles.deleteButton}
      onMouseDown={() => onDelete(option)}
    />
    <span className={styles.label}>{option.label}</span>
  </div>
);

Value.propTypes = {
  onDelete: PropTypes.func,
  getClass: PropTypes.func,
  option: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

Value.defaultProps = {
  onDelete: () => {},
  getClass: () => {},
};

export default Value;
