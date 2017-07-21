import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Radio.css';

const getSelectedClass = (selectedValue, option) => (
  selectedValue === option.value ? styles.isSelected : null
);

const Radio = ({
  options,
  value,
  onChange,
}) => (
  <div className={styles.container}>
    { options.map(option => (
      <div
        data-test="Radio.option"
        key={option.value}
        className={classNames(styles.option, getSelectedClass(value, option))}
      >
        <button
          data-test="Radio.optionButton"
          className={styles.button}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      </div>
    )) }
  </div>
);

Radio.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    label: PropTypes.string,
  })),
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  value: null,
  options: [],
  onChange: () => {},
};

export default Radio;
