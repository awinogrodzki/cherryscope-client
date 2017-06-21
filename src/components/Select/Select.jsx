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
    this.activeOption = null;
    this.expandableContainer = null;

    this.state = {
      activeOptionIndex: 0,
      values: props.values,
      inputValue: props.inputValue,
      isExpanded: props.isExpanded,
    };
  }

  handleValuesChange() {
    const optionCount = this.getOptionCount();
    if (optionCount && this.state.activeOptionIndex > optionCount - 1) {
      this.setState({ activeOptionIndex: optionCount - 1 });
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
    this.setState({
      activeOptionIndex: 0,
    }, () => this.updateExpandableContainerScroll());

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
        this.handleArrowDown(e);
        break;
      case 38:
        this.handleArrowUp(e);
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
    if (options.length > 0 && get(options, this.state.activeOptionIndex, false)) {
      this.selectOption(options[this.state.activeOptionIndex]);
    }
  }

  handleInputEscape() {
    this.onInputBlur();
    this.setState({
      inputValue: '',
    });
  }

  handleArrowUp(e) {
    e.preventDefault();

    if (this.state.activeOptionIndex <= 0) {
      this.setState({
        activeOptionIndex: 0,
      }, () => this.updateExpandableContainerScroll());
      return;
    }

    this.setState({
      activeOptionIndex: this.state.activeOptionIndex - 1,
    }, () => this.updateExpandableContainerScroll());
  }

  handleArrowDown(e) {
    const optionLength = this.getOptionCount();

    e.preventDefault();

    if (this.state.activeOptionIndex >= optionLength - 1) {
      this.setState({
        activeOptionIndex: optionLength - 1,
      }, () => this.updateExpandableContainerScroll());
      return;
    }

    this.setState({
      activeOptionIndex: this.state.activeOptionIndex + 1,
    }, () => this.updateExpandableContainerScroll());
  }

  getOptionCount() {
    return this.getOptionsFromGroups().length || this.props.options.length;
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

  setExpandableContainer(ref) {
    if (!ref) {
      return;
    }

    this.expandableContainer = ref;
  }

  /* eslint-disable react/no-array-index-key */
  render() {
    return (
      <div className={styles.container}>
        <div
          className={styles.inputContainer}
        >
          { !!this.state.values.length && this.state.values.map((option, index) => (
            <Value
              key={index}
              option={option}
              getClass={this.props.getValueClass}
              onDelete={optionToDelete => this.onValueDelete(optionToDelete)}
            />
          )) }
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
            placeholder={this.props.isLoading ? 'Loading...' : this.props.inputPlaceholder}
          />
        </div>
        <div
          className={styles.expandableContainer}
        >
          <div
            ref={ref => this.setExpandableContainer(ref)}
            data-test="Select.expandable"
            className={styles.expandable}
            onMouseDown={() => this.ignoreBlurOnce()}
          >
            { !!this.state.isExpanded &&
            <div data-test="Select.optionContainer" className={styles.optionContainer}>
              {this.renderOptionGroups()}
            </div>
          }
          </div>
        </div>
      </div>
    );
  }
  /* eslint-enable */

  filterSelected(options = [], filterByValue = false) {
    return options.filter(option => !this.isSelected(option, filterByValue));
  }

  filterOptions(options = [], filterByValue = false) {
    const notSelectedOptions = this.filterSelected(options, filterByValue);

    if (!this.state.inputValue) {
      return notSelectedOptions;
    }

    return notSelectedOptions.filter(option => this.isInputValueLikeOption(option));
  }

  filterOptionsByGroup(group) {
    if (
      !group.options ||
      group.isSingle === true && this.hasSelectedOptions(group)
    ) {
      return [];
    }

    if (group.filterByInput === false) {
      return this.filterSelected(group.options, group.isUnique);
    }

    return this.filterOptions(group.options, group.isUnique);
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

  isSelected(option, filterByValue = false) {
    if (filterByValue) {
      return find(this.state.values, { value: option.value });
    }

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
    if (key === this.state.activeOptionIndex) {
      return styles.activeOption;
    }

    return '';
  }

  getOptionIndex(optionIndex, groupIndex) {
    let optionCount = 0;

    if (groupIndex === 0) {
      return optionIndex;
    }

    for (let i = 0; i < groupIndex; i += 1) {
      optionCount += this.filterOptionsByGroup(this.props.optionGroups[i]).length;
    }

    return optionIndex + optionCount;
  }

  handleOptionRef(ref, index) {
    if (index === this.state.activeOptionIndex && ref !== null) {
      this.setActiveOption(ref);
    }
  }

  setActiveOption(ref) {
    this.activeOption = ref;
  }

  updateExpandableContainerScroll() {
    if (!this.expandableContainer || !this.activeOption) {
      return;
    }

    const expandableRect = this.expandableContainer.getBoundingClientRect();
    const optionRect = this.activeOption.getBoundingClientRect();
    const optionBottom = optionRect.bottom;
    const expandableBottom = expandableRect.bottom;
    const scrollTop = this.expandableContainer.scrollTop;

    if (optionBottom < expandableBottom) {
      this.setScrollTop(this.expandableContainer, scrollTop + optionBottom - expandableBottom);
    }

    if (optionBottom > expandableBottom) {
      this.setScrollTop(this.expandableContainer, scrollTop + optionBottom - expandableBottom);
    }
  }

  setScrollTop(element, value) {
    element.scrollTop = value; // eslint-disable-line no-param-reassign
  }

  getLabelClass(optionGroupId) {
    return `${optionGroupId}Group`;
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
        id={group.id || index}
        key={group.id || index}
        index={index}
        labelClass={this.props.getLabelClass(group)}
        getOptionIndex={optionIndex => this.getOptionIndex(optionIndex, index)}
        getOptionClass={optionKey => this.getOptionClass(optionKey)}
        getOptionRef={(ref, refIndex) => this.handleOptionRef(ref, refIndex)}
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
  getLabelClass: PropTypes.func,
  getValueClass: PropTypes.func,
  optionGroups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    index: PropTypes.number,
    labelClass: PropTypes.string,
    getOptionClass: PropTypes.func,
    getOptionRef: PropTypes.func,
    label: PropTypes.string,
    onOptionClick: PropTypes.func,
    filterByInput: PropTypes.bool,
    isSingle: PropTypes.bool,
    isUnique: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
    customComponent: PropTypes.node,
  })),
  options: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  isExpanded: PropTypes.bool,
  inputPlaceholder: PropTypes.string,
};

Select.defaultProps = {
  inputValue: '',
  onInputChange: () => {},
  values: [],
  onChange: () => {},
  getLabelClass: () => {},
  getValueClass: () => {},
  optionGroups: [],
  options: [],
  isLoading: false,
  isExpanded: false,
  inputPlaceholder: '',
};

export default Select;
