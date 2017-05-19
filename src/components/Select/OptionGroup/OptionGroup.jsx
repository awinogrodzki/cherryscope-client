import React from 'react';
import PropTypes from 'prop-types';
import Option from '../Option';
import styles from './OptionGroup.css';

const renderOptions = (options, onOptionClick, onCustomComponentClick, customComponent) => {
  if (customComponent) {
    return (
      <div
        role="button"
        onMouseDown={onCustomComponentClick}
        onTouchStart={onCustomComponentClick}
      >
        {customComponent}
      </div>
    );
  }

  return options.map(option => (
    <Option key={option.value} option={option} onClick={onOptionClick} />
  ));
};

const OptionGroup = ({
  id,
  label,
  options,
  onLabelClick,
  onOptionClick,
  customComponent,
  onCustomComponentClick,
}) => (
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
    { renderOptions(options, onOptionClick, onCustomComponentClick, customComponent) }
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
  customComponent: PropTypes.node,
  onCustomComponentClick: PropTypes.func,
};

OptionGroup.defaultProps = {
  id: null,
  label: null,
  onLabelClick: () => {},
  onOptionClick: () => {},
  options: [],
  customComponent: null,
  onCustomComponentClick: () => {},
};

export default OptionGroup;
