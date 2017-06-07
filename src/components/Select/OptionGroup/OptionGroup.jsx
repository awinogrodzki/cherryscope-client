import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Option from '../Option';
import styles from './OptionGroup.css';

const renderOptions = ({
  options,
  onOptionClick,
  customComponent,
  getOptionClass,
  getOptionIndex,
  getOptionRef,
}) => {
  if (customComponent) {
    return customComponent;
  }

  return options.map((option, index) => (
    <Option
      index={getOptionIndex(index)}
      key={getOptionIndex(index)}
      option={option}
      onClick={onOptionClick}
      getClass={getOptionClass}
      getRef={getOptionRef}
    />
  ));
};

const OptionGroup = ({
  id,
  index,
  label,
  options,
  onOptionClick,
  customComponent,
  labelClass,
  getOptionClass,
  getOptionIndex,
  getOptionRef,
}) => (
  <div className={styles.container}>
    { label &&
      <div
        data-index={index}
        id={id}
        data-test="OptionGroup.label"
        className={classNames(
          styles.labelContainer,
          labelClass
        )}
      >
        <span className={styles.label}>{label}</span>
      </div>
    }
    { renderOptions({
      options,
      onOptionClick,
      customComponent,
      getOptionClass,
      getOptionIndex,
      getOptionRef,
    }) }
  </div>
);

OptionGroup.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  index: PropTypes.number,
  getOptionIndex: PropTypes.func,
  getOptionClass: PropTypes.func,
  getOptionRef: PropTypes.func,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  onOptionClick: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  customComponent: PropTypes.node,
};

OptionGroup.defaultProps = {
  id: null,
  index: 0,
  getOptionClass: () => {},
  label: null,
  labelClass: null,
  getOptionIndex: index => index,
  onOptionClick: () => {},
  getOptionRef: () => {},
  options: [],
  customComponent: null,
};

export default OptionGroup;
