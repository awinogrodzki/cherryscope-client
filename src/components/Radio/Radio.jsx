import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Radio.css';

class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  onChange(value) {
    this.setState({
      value,
    });
  }

  getSelectedClass(option) {
    return this.state.value === option.value ? styles.isSelected : null;
  }

  render() {
    return (
      <div className={styles.container}>
        { this.props.options.map(option => (
          <div
            key={option.value}
            className={classNames(styles.option, this.getSelectedClass(option))}
          >
            <button onClick={() => this.onChange(option.value)}>
              {option.label}
            </button>
          </div>
        )) }
      </div>
    );
  }
}

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
};

Radio.defaultProps = {
  value: null,
  options: [],
};

export default Radio;
