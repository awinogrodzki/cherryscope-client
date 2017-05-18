import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import OptionGroup from './OptionGroup';
import Value from './Value';
import styles from './Select.css';


class Select extends React.Component {
  constructor(props) {
    super(props);

    this.input = null;
    this.ignoreBlur = false;
    this.state = {
      values: this.getInitialValues(),
      inputValue: props.inputValue,
      isExpanded: props.isExpanded,
    };
  }

  getInitialValues() {
    if (!this.props.values) {
      return [];
    }

    if (this.props.values && this.props.groupBy) {
      return this.mapGroupsToValue(this.props.values);
    }

    if (
      typeof this.props.values === 'object'
      && !Array.isArray(this.props.values)
      && !this.props.groupBy
    ) {
      throw new Error('If values is of type object, groupBy needs to be specified.');
    }

    return this.props.values;
  }

  mapGroupsToValue(groups) {
    let values = [];

    Object.keys(groups).forEach((groupName) => {
      const group = groups[groupName];
      if (!group) {
        return;
      }

      const mappedGroup = group.map(option => ({
        ...option,
        [this.props.groupBy]: groupName,
      }));

      values = [...values, ...mappedGroup];
    });

    return values;
  }

  handleValuesChange() {
    if (this.canGroup()) {
      return this.props.onChange(this.groupValues(this.state.values, this.props.groupBy));
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
    if (options.length > 0) {
      this.selectOption(options[0]);
    }
  }

  handleInputEscape() {
    this.onInputBlur();
    this.setState({
      inputValue: '',
    });
  }

  getFilteredOptions() {
    if (this.props.optionGroups.length > 0) {
      return this.filterOptions(this.getOptionsFromGroups());
    }

    return this.filterOptions(this.props.options);
  }

  getOptionsFromGroups() {
    let options = [];

    this.props.optionGroups.forEach((group) => {
      options = [...options, ...group.options];
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
        <div className={styles.inputContainer}>
          <div className={styles.valueContainer}>
            { !!this.state.values.length && this.state.values.map(option => (
              <Value
                key={option.value}
                option={option}
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
        { !!this.state.isExpanded &&
          <div data-test="Select.optionContainer" className={classNames(styles.optionContainer)}>
            {this.renderOptionGroups()}
          </div>
        }
      </div>
    );
  }

  filterOptions(options) {
    const notSelectedOptions = options.filter(option => !this.isSelected(option));

    if (!this.state.inputValue) {
      return notSelectedOptions;
    }

    return notSelectedOptions.filter(option => this.isInputValueLikeOption(option));
  }

  isInputValueLikeOption(option) {
    return option.label
      .toLowerCase()
      .indexOf(
        this.state.inputValue.toLowerCase().trim()
      ) !== -1;
  }

  canGroup() {
    return this.props.groupBy;
  }

  onOptionClick(option) {
    this.ignoreBlurOnce();

    this.selectOption(option);

    return null;
  }

  selectOption(option) {
    if (!this.isSelected(option)) {
      this.assignOption(option);
    }
  }

  isSelected(option) {
    return find(this.state.values, { value: option.value });
  }

  assignOption(option) {
    this.setState({
      values: [...this.state.values, option],
      inputValue: '',
    }, () => {
      this.handleValuesChange();
    });
  }

  groupValues(values, groupBy) {
    const groups = {};

    values.forEach((option) => {
      const groupName = option[groupBy];

      if (!groupName) {
        return;
      }

      (groups[groupName] = groups[groupName] || []).push(option);
    });

    return groups;
  }

  renderOptionGroups() {
    if (this.props.optionGroups.length > 0) {
      return this.props.optionGroups.map((group, index) => this.renderOptionGroup(
        group.options,
        group.label,
        group.id || index
      ));
    }

    return this.renderOptionGroup(this.props.options);
  }

  renderOptionGroup(options, label = null, key = 0) {
    const filteredOptions = this.filterOptions(options);

    if (!filteredOptions.length) {
      return null;
    }

    return (
      <OptionGroup
        key={key}
        label={label}
        options={filteredOptions}
        onLabelClick={() => this.ignoreBlurOnce()}
        onOptionClick={value => this.onOptionClick(value)}
      />
    );
  }
}

const optionType = PropTypes.shape({
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
});

Select.propTypes = {
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func,
  values: PropTypes.oneOfType([
    PropTypes.arrayOf(optionType),
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
  optionGroups: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    options: PropTypes.arrayOf(optionType),
  })),
  groupBy: PropTypes.string,
  options: PropTypes.arrayOf(optionType),
  isLoading: PropTypes.bool,
  isExpanded: PropTypes.bool,
};

Select.defaultProps = {
  inputValue: '',
  onInputChange: () => {},
  values: null,
  onChange: () => {},
  optionGroups: [],
  groupBy: null,
  options: [],
  isLoading: false,
  isExpanded: false,
};

export default Select;
