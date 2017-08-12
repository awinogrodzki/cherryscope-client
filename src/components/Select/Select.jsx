import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SelectHandler, {
  SELECT,
  DESELECT,
} from './SelectHandler';
import styles from './Select.css';
import Input from './Input';
import { optionType } from './Option/types';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.onDeselect = this.onDeselect.bind(this);
    this.onOptionDelete = this.onOptionDelete.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.selectHandler = new SelectHandler();
    this.selectHandler.addListener(SELECT, this.onSelect);
    this.selectHandler.addListener(DESELECT, this.onDeselect);

    this.state = {
      inputValue: '',
    };
  }

  onSelect(selectedOptions) {
    this.props.onChange(selectedOptions);
    this.changeInputValue('');
  }

  onDeselect(selectedOptions) {
    this.props.onChange(selectedOptions);
  }

  onOptionDelete(option) {
    this.selectHandler.deselectOption(option);
  }

  onInputChange(event) {
    const inputValue = event.target.value;
    this.changeInputValue(inputValue);
  }

  changeInputValue(value) {
    this.setState({
      inputValue: value,
    }, () => this.props.onInputChange(value));
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
          value={this.state.inputValue}
          onChange={this.onInputChange}
          onOptionDelete={this.onOptionDelete}
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
  onInputChange: PropTypes.func,
  onChange: PropTypes.func,
  selectedOptions: PropTypes.arrayOf(optionType),
  isExpanded: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

Select.defaultProps = {
  onInputChange: () => {},
  onChange: () => {},
  selectedOptions: [],
  isExpanded: false,
  children: null,
};

Select.childContextTypes = {
  selectHandler: PropTypes.instanceOf(SelectHandler).isRequired,
};

export default Select;
