import React from 'react';
import PropTypes from 'prop-types';
import { find, isEqual, get } from 'lodash';
import OptionGroup from './OptionGroup';
import Value from './Value';
import styles from './Select.css';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.input = null;
    this.ignoreBlur = false;
    this.activeOptionIndex = 0;

    this.state = {
      values: props.values,
      inputValue: props.inputValue,
      isExpanded: props.isExpanded,
    };
  }

  handleValuesChange() {
    const optionCount = this.getOptionCount();
    if (optionCount && this.activeOptionIndex > optionCount - 1) {
      this.activeOptionIndex = optionCount - 1;
      this.forceUpdate();
    }

    return this.props.onChange(this.state.values);
  }

  setInput(input) {
    this.input = input;
  }

  onInputChange(e) {
    this.setState({ inputValue: e.target.value });
    this.props.onInputChange(e.target.value);
  }

  onInputKeyDown(e) {
    switch (e.keyCode) {
      case 8:
        this.handleInputBackspace();
        break;
      case 13:
        this.handleInputEnter();
        break;
      case 27:
        this.handleInputEscape();
        break;
      case 40:
        this.handleArrowDown();
        break;
      case 38:
        this.handleArrowUp();
        break;
      default:
        if (!this.state.isExpanded) { this.expand(); }
    }
  }

  expand() {
    this.setState({
      isExpanded: true,
    });
  }

  onInputFocus() {
    this.expand();
  }

  collapse() {
    this.setState({
      isExpanded: false,
    });
  }

  ignoreBlurOnce() {
    this.ignoreBlur = true;
  }

  onInputBlur() {
    if (this.ignoreBlur) {
      this.input.focus();
      this.ignoreBlur = false;
      return;
    }

    this.collapse();
  }

  handleInputBackspace() {
    if (this.state.inputValue.length === 0 && this.state.values.length > 0) {
      this.deleteValue(this.state.values[this.state.values.length - 1]);
    }
  }

  handleInputEnter() {
    const options = this.getFilteredOptions();
    if (options.length > 0 && get(options, this.activeOptionIndex, false)) {
      this.selectOption(options[this.activeOptionIndex]);
    }
  }

  handleInputEscape() {
    this.onInputBlur();
    this.setState({
      inputValue: '',
    });
  }

  handleArrowUp() {
    if (this.activeOptionIndex <= 0) {
      this.activeOptionIndex = 0;
      this.forceUpdate();
      return;
    }

    this.activeOptionIndex = this.activeOptionIndex - 1;
    this.forceUpdate();
  }

  getOptionCount() {
    return this.getOptionsFromGroups().length || this.props.options.length;
  }

  handleArrowDown() {
    const optionLength = this.getOptionCount();

    if (this.activeOptionIndex >= optionLength - 1) {
      this.activeOptionIndex = optionLength - 1;
      this.forceUpdate();
      return;
    }

    this.activeOptionIndex = this.activeOptionIndex + 1;
    this.forceUpdate();
  }

  getFilteredOptions() {
    if (this.props.optionGroups.length > 0) {
      return this.getOptionsFromGroups();
    }

    return this.filterOptions(this.props.options);
  }

  getOptionsFromGroups() {
    let options = [];

    this.props.optionGroups.forEach((group) => {
      options = [
        ...options,
        ...this.filterOptionsByGroup(group),
      ];
    });

    return options;
  }

  onValueDelete(optionToDelete) {
    this.ignoreBlurOnce();
    this.deleteValue(optionToDelete);
  }

  deleteValue(optionToDelete) {
    this.setState({
      values: [
        ...this.state.values.filter(option => !isEqual(option, optionToDelete)),
      ],
    }, () => {
      this.handleValuesChange();
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div
          className={styles.inputContainer}
        >
          <div className={styles.valueContainer}>
            { !!this.state.values.length && this.state.values.map(option => (
              <Value
                key={option.value}
                option={option}
                getClass={this.props.getValueClass}
                onDelete={optionToDelete => this.onValueDelete(optionToDelete)}
              />
            )) }
          </div>
          <input
            ref={input => this.setInput(input)}
            data-test="Select.input"
            type="text"
            value={this.state.inputValue}
            onChange={e => this.onInputChange(e)}
            onKeyDown={e => this.onInputKeyDown(e)}
            onFocus={e => this.onInputFocus(e)}
            onBlur={e => this.onInputBlur(e)}
            className={styles.input}
            placeholder={this.props.isLoading ? 'Loading' : ''}
          />
        </div>
        <div
          data-test="Select.expandable"
          className={styles.expandable}
          onMouseDown={() => this.ignoreBlurOnce()}
          onTouchStart={() => this.ignoreBlurOnce()}
        >
          { !!this.state.isExpanded &&
          <div data-test="Select.optionContainer" className={styles.optionContainer}>
            {this.renderOptionGroups()}
          </div>
        }
        </div>
      </div>
    );
  }

  filterOptions(options = []) {
    const notSelectedOptions = options.filter(option => !this.isSelected(option));

    if (!this.state.inputValue) {
      return notSelectedOptions;
    }

    return notSelectedOptions.filter(option => this.isInputValueLikeOption(option));
  }

  filterOptionsByGroup(group) {
    if (group.isSingle === true && this.hasSelectedOptions(group)) {
      return [];
    }

    return group.filterByInput === false
    ? group.options || []
    : this.filterOptions(group.options);
  }

  hasSelectedOptions(group) {
    if (!group.options) {
      return false;
    }

    return !!group.options.filter(option => this.isSelected(option)).length;
  }

  isInputValueLikeOption(option) {
    return option.label
      .toLowerCase()
      .indexOf(
        this.state.inputValue.toLowerCase().trim()
      ) !== -1;
  }

  onOptionClick(option) {
    this.selectOption(option);

    return null;
  }

  selectOption(option) {
    if (!this.isSelected(option)) {
      this.assignOption(option);
    }
  }

  isSelected(option) {
    return find(this.state.values, option);
  }

  assignOption(option) {
    this.setState({
      values: [...this.state.values, option],
      inputValue: '',
    }, () => {
      this.handleValuesChange();
    });
  }

  getOptionClass(key) {
    if (key === this.activeOptionIndex) {
      return styles.activeOption;
    }

    return '';
  }

  renderOptionGroups() {
    if (this.props.optionGroups.length > 0) {
      return this.props.optionGroups.map(
        (group, index) => group && this.renderOptionGroup(group, index)
      );
    }

    return this.renderOptionGroup({ options: this.props.options });
  }

  renderOptionGroup(group, index) {
    const filteredOptions = this.filterOptionsByGroup(group);

    if (!filteredOptions.length && !group.customComponent) {
      return null;
    }

    return (
      <OptionGroup
        key={group.id || index}
        index={index}
        getOptionClass={optionKey => this.getOptionClass(optionKey)}
        label={group.label}
        options={filteredOptions}
        onOptionClick={value => this.onOptionClick(value)}
        customComponent={group.customComponent}
      />
    );
  }
}

Select.propTypes = {
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func,
  values: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  getValueClass: PropTypes.func,
  optionGroups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    index: PropTypes.number,
    getOptionClass: PropTypes.func,
    label: PropTypes.string,
    onOptionClick: PropTypes.func,
    filterByInput: PropTypes.bool,
    isSingle: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
    customComponent: PropTypes.node,
  })),
  options: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  isExpanded: PropTypes.bool,
};

Select.defaultProps = {
  inputValue: '',
  onInputChange: () => {},
  values: [],
  onChange: () => {},
  getValueClass: () => {},
  optionGroups: [],
  options: [],
  isLoading: false,
  isExpanded: false,
};

export default Select;
