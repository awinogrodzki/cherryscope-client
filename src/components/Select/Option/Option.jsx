import React from 'react';
import PropTypes from 'prop-types';
import { optionType } from './types';
import styles from './Option.css';

const Option = ({
  option,
  onClick,
}) => (
  <button onClick={() => onClick(option)} className={styles.container}>
    {option.label}
  </button>
);

Option.propTypes = {
  option: optionType.isRequired,
  onClick: PropTypes.func,
};

Option.defaultProps = {
  onClick: () => {},
};

export default Option;
