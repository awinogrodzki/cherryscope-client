import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from 'react-icons/lib/ti/delete-outline';
import styles from './Value.css';
import { optionType } from '../Option/types';

const Value = ({
  option,
  onDelete,
}) => (
  <div className={styles.container}>
    <button className={styles.deleteButton} onClick={() => onDelete(option)}>
      <DeleteIcon />
    </button>
    <span className={styles.label}>{option.label}</span>
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
