import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Option from '../Option';
import styles from './OptionGroup.css';
import { optionGroupTypes } from './types';

const renderOptions = ({
  options,
  onOptionClick,
  customComponent,
  getOptionClass,
  getOptionIndex,
  getOptionElement,
}) => {
  if (customComponent) {
    return customComponent;
  }

  return options.map((option, index) => (
    <Option
      index={getOptionIndex ? getOptionIndex(index) : index}
      key={getOptionIndex ? getOptionIndex(index) : index}
      option={option}
      onClick={onOptionClick}
      getClass={getOptionClass}
      getElement={getOptionElement}
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
  getOptionElement,
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
      getOptionElement,
    }) }
  </div>
);

OptionGroup.propTypes = optionGroupTypes;

OptionGroup.defaultProps = {
  id: null,
  index: 0,
  label: null,
  labelClass: null,
  getOptionIndex: null,
  getOptionClass: () => {},
  getOptionElement: () => {},
  options: [],
  onOptionClick: () => {},
  filterByInput: PropTypes.bool,
  isSingle: PropTypes.bool,
  isUnique: PropTypes.bool,
  customComponent: null,
};

export default OptionGroup;
