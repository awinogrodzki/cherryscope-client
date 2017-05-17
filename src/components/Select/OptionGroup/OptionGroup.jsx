import React from 'react';
import PropTypes from 'prop-types';
import Option from '../Option';
import styles from './OptionGroup.css';

const OptionGroup = ({ label, options, onOptionClick }) => (
  <div className={styles.container}>
    { label &&
      <div data-test="OptionGroup.label" className={styles.labelContainer}>
        <span className={styles.label}>{label}</span>
      </div>
    }
    { options.map(option => (
      <Option key={option.value} option={option} onClick={onOptionClick} />
    )) }
  </div>
);

OptionGroup.propTypes = {
  label: PropTypes.string,
  onOptionClick: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
  })),
};

OptionGroup.defaultProps = {
  label: null,
  onOptionClick: () => {},
  options: [],
};

export default OptionGroup;
