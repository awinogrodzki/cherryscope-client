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

    this.state = {
      values: this.getInitialValues(),
      inputValue: props.inputValue,
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

  onInputChange(e) {
    this.setState({ inputValue: e.target.value });
    this.props.onInputChange(e.target.value);
  }

  onInputKeyUp(e) {
    const keyCode = e.keyCode;

    // backspace
    if (keyCode === 8) {
      this.handleInputBackspace();
    }
  }

  handleInputBackspace() {
    if (this.state.inputValue.length === 0 && this.state.values.length > 0) {
      this.deleteOption(this.state.values[this.state.values.length - 1]);
    }
  }

  deleteOption(optionToDelete) {
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
                onDelete={optionToDelete => this.deleteOption(optionToDelete)}
              />
            )) }
          </div>
          <input
            data-test="Select.input"
            type="text"
            value={this.state.inputValue}
            onChange={e => this.onInputChange(e)}
            onKeyUp={e => this.onInputKeyUp(e)}
            className={styles.input}
            placeholder={this.props.isLoading ? 'Loading' : ''}
          />
        </div>
        <div className={classNames(styles.optionListContainer)}>
          {this.renderOptionGroups()}
        </div>
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
    const isSelected = this.isSelected(option);

    if (!isSelected) {
      return this.assignOption(option);
    }

    return null;
  }

  isSelected(option) {
    return find(this.state.values, { value: option.value });
  }

  assignOption(option) {
    this.setState({
      values: [...this.state.values, option],
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
        onOptionClick={value => this.onOptionClick(value, key)}
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
};

export default Select;
