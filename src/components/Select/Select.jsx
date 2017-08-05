import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { find, isEqual, get } from 'lodash';
import Loader from 'components/Loader';
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

    this.setInput = this.setInput.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onValueDelete = this.onValueDelete.bind(this);
    this.ignoreBlurOnce = this.ignoreBlurOnce.bind(this);

    this.registerEventListeners();
  }

  registerEventListeners() {
    window.addEventListener('resize', e => this.onWindowResize(e));
  }

  onWindowResize() {
    this.adjustExpandableContainer();
  }

  adjustExpandableContainer() {
    if (!this.expandableContainer || !window) {
      return;
    }

    if (!this.state.isExpanded) {
      this.expandableContainer.style.maxHeight = 0;
      return;
    }

    const rect = this.expandableContainer.getBoundingClientRect();
    const documentHeight = document.body.offsetHeight;
    const targetHeight = documentHeight - rect.top - rect.left;

    this.expandableContainer.style.maxHeight = `${targetHeight}px`;
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
    if (this.ignoreBlur || this.props.ignoreInputBlur) {
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

  setExpandableContainer(element) {
    if (!element) {
      return;
    }

    this.expandableContainer = element;
    this.adjustExpandableContainer();
  }

  /* eslint-disable react/no-array-index-key */
  render() {
    return (
      <div
        className={classNames(
        styles.container,
        this.props.className
      )}
      >
        <div
          className={styles.inputContainer}
        >
          { !!this.state.values.length && this.state.values.map((option, index) => (
            <Value
              key={index}
              option={option}
              getClass={this.props.getValueClass}
              onDelete={this.onValueDelete}
            />
          )) }
          <input
            ref={this.setInput}
            data-test="Select.input"
            type="text"
            value={this.state.inputValue}
            onChange={this.onInputChange}
            onKeyDown={this.onInputKeyDown}
            onFocus={this.onInputFocus}
            onBlur={this.onInputBlur}
            className={styles.input}
            placeholder={this.state.values.length ? '' : this.props.inputPlaceholder}
          />
          { this.props.isLoading && <Loader className={styles.loader} /> }
        </div>
        <div
          className={styles.expandableContainer}
        >
          <div
            ref={element => this.setExpandableContainer(element)}
            data-test="Select.expandable"
            className={classNames({
              [styles.expandable]: true,
              [styles.isExpanded]: this.state.isExpanded || this.props.isExpanded,
            })}
            onMouseDown={this.ignoreBlurOnce}
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

  getOptionClass(key, group) {
    const isActive = key === this.state.activeOptionIndex;
    return classNames({
      [styles.activeOption]: isActive,
      [this.props.getOptionClass(isActive, group)]: true,
    });
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

  handleOptionElement(element, index) {
    if (index === this.state.activeOptionIndex && element !== null) {
      this.setActiveOption(element);
    }
  }

  setActiveOption(element) {
    this.activeOption = element;
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
        getOptionClass={optionKey => this.getOptionClass(optionKey, group)}
        getOptionElement={(element, elementIndex) => (
          this.handleOptionElement(element, elementIndex)
        )}
        label={group.label}
        options={filteredOptions}
        onOptionClick={value => this.onOptionClick(value)}
        customComponent={group.customComponent}
      />
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func,
  values: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  getLabelClass: PropTypes.func,
  getValueClass: PropTypes.func,
  getOptionClass: PropTypes.func,
  optionGroups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    index: PropTypes.number,
    labelClass: PropTypes.string,
    getOptionClass: PropTypes.func,
    getOptionElement: PropTypes.func,
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
  ignoreInputBlur: PropTypes.bool,
};

Select.defaultProps = {
  className: null,
  inputPlaceholder: '',
  inputValue: '',
  onInputChange: () => {},
  values: [],
  onChange: () => {},
  getLabelClass: () => {},
  getValueClass: () => {},
  getOptionClass: () => {},
  optionGroups: [],
  options: [],
  isLoading: false,
  isExpanded: false,
  ignoreInputBlur: false,
};

export default Select;
