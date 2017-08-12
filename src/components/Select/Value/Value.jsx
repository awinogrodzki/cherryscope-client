import React from 'react';
import PropTypes from 'prop-types';
import styles from './Value.css';
import { optionType } from '../Option/types';

const Value = ({
  option,
  onDelete,
}) => (
  <div className={styles.container}>
    <button onClick={() => onDelete(option)}>x</button>
    <span>{option.label}</span>
  </div>
);

Value.propTypes = {
  option: optionType.isRequired,
  onDelete: PropTypes.func,
};

Value.defaultProps = {
  onDelete: () => {},
};

export default Value;
