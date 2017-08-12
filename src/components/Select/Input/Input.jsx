import React from 'react';
import PropTypes from 'prop-types';
import Value from '../Value';
import styles from './Input.css';
import { optionType } from '../Option/types';

const Input = ({
  value,
  options,
  onOptionDelete,
  onChange,
}) => (
  <div className={styles.container}>
    { options.map(option => (
      <Value
        key={option.value}
        onDelete={onOptionDelete}
        option={option}
      />
    )) }
    <input
      value={value}
      onChange={onChange}
      className={styles.input}
    />
  </div>
);

Input.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(optionType),
  onOptionDelete: PropTypes.func,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  options: [],
  onOptionDelete: () => {},
  onChange: () => {},
};

export default Input;
