import React from 'react';
import PropTypes from 'prop-types';
import Option from '../Option';
import styles from './OptionGroup.css';

const renderOptions = (options, onOptionClick, customComponent) => {
  if (customComponent) {
    return customComponent;
  }

  return options.map(option => (
    <Option key={option.value} option={option} onClick={onOptionClick} />
  ));
};

const OptionGroup = ({
  id,
  label,
  options,
  onOptionClick,
  customComponent,
}) => (
  <div className={styles.container}>
    { label &&
      <div
        id={id}
        data-test="OptionGroup.label"
        className={styles.labelContainer}
      >
        <span className={styles.label}>{label}</span>
      </div>
    }
    { renderOptions(options, onOptionClick, customComponent) }
  </div>
);

OptionGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onOptionClick: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })),
  customComponent: PropTypes.node,
};

OptionGroup.defaultProps = {
  id: null,
  label: null,
  onOptionClick: () => {},
  options: [],
  customComponent: null,
};

export default OptionGroup;
