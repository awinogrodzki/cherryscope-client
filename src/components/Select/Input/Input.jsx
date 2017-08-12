import React from 'react';
import PropTypes from 'prop-types';
import Value from '../Value';
import styles from './Input.css';
import { optionType } from '../Option/types';

const Input = ({
  options,
  onOptionDelete,
}) => (
  <div className={styles.container}>
    { options.map(option => (
      <Value
        key={option.value}
        onDelete={onOptionDelete}
        option={option}
      />
    )) }
    <input className={styles.input} />
  </div>
);

Input.propTypes = {
  options: PropTypes.arrayOf(optionType),
  onOptionDelete: PropTypes.func,
};

Input.defaultProps = {
  options: [],
  onOptionDelete: () => {},
};

export default Input;
