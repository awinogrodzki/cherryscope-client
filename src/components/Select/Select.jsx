import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createSelectHandler, SelectHandler } from './SelectHandler';
import styles from './Select.css';
import Input from './Input';
import { optionType } from './Option/types';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.selectHandler = createSelectHandler();
    this.selectHandler.addChangeListener(this.onChange);
  }

  onChange(selectedOptions) {
    this.props.onChange(selectedOptions);
  }

  getChildContext() {
    return {
      selectHandler: this.selectHandler,
    };
  }

  isExpanded() {
    return this.props.isExpanded;
  }

  render() {
    return (
      <div className={styles.container}>
        <Input
          onOptionDelete={option => this.selectHandler.unselectOption(option)}
          options={this.props.selectedOptions}
        />
        <div
          className={classNames({
            [styles.expandableContainer]: true,
            [styles.isExpanded]: this.isExpanded(),
          })}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  onChange: PropTypes.func,
  selectedOptions: PropTypes.arrayOf(optionType),
  isExpanded: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

Select.defaultProps = {
  onChange: () => {},
  selectedOptions: [],
  isExpanded: false,
  children: null,
};

Select.childContextTypes = {
  selectHandler: PropTypes.instanceOf(SelectHandler).isRequired,
};

export default Select;
