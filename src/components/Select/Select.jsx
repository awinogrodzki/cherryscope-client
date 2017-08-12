import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SelectHandler from './SelectHandler';
import styles from './Select.css';
import Input from './Input';
import { optionType } from './Option/types';

const Select = ({
  selectedOptions,
  children,
  isExpanded,
  selectHandler,
}) => (
  <div className={styles.container}>
    <Input
      onOptionDelete={option => selectHandler.unselectOption(option)}
      options={selectedOptions}
    />
    <div
      className={classNames({
        [styles.expandableContainer]: true,
        [styles.isExpanded]: isExpanded,
      })}
    >
      {children}
    </div>
  </div>
);

Select.propTypes = {
  selectedOptions: PropTypes.arrayOf(optionType),
  selectHandler: PropTypes.instanceOf(SelectHandler).isRequired,
  isExpanded: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

Select.defaultProps = {
  selectedOptions: [],
  isExpanded: false,
  children: null,
};

export default Select;
