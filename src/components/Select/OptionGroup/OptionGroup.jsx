import React from 'react';
import PropTypes from 'prop-types';
import Option from '../Option';
import styles from './OptionGroup.css';

const OptionGroup = ({ id, label, options, onLabelClick, onOptionClick }) => (
  <div className={styles.container}>
    { label &&
      <div
        id={id}
        role="button"
        onMouseDown={onLabelClick}
        onTouchStart={onLabelClick}
        data-test="OptionGroup.label"
        className={styles.labelContainer}
      >
        <span className={styles.label}>{label}</span>
      </div>
    }
    { options.map(option => (
      <Option key={option.value} option={option} onClick={onOptionClick} />
    )) }
  </div>
);

OptionGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onLabelClick: PropTypes.func,
  onOptionClick: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })),
};

OptionGroup.defaultProps = {
  id: null,
  label: null,
  onLabelClick: () => {},
  onOptionClick: () => {},
  options: [],
};

export default OptionGroup;
