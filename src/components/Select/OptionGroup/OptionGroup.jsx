import React from 'react';
import PropTypes from 'prop-types';
import SelectHandler from '../SelectHandler';
import Option from '../Option';
import { optionType } from '../Option/types';

class OptionGroup extends React.Component {
  filterByQuery(options, query) {
    return options.filter((option) => {
      let foundSimilarWords = false;
      const words = option.label.trim().split(' ');

      words.forEach(word => {
        if (
          !foundSimilarWords
          && word.trim().toLowerCase().indexOf(query.toLowerCase()) >= 0
        ) {
          foundSimilarWords = true;
        }
      });

      return foundSimilarWords;
    });
  }

  applyFilters(options) {
    let filteredOptions = options;

    if (this.props.query && this.props.shouldFilterByQuery) {
      filteredOptions = this.filterByQuery(options, this.props.query);
    }

    filteredOptions = filteredOptions
      .filter(option => !this.context.selectHandler.isOptionSelected(option));

    return filteredOptions;
  }

  render() {
    return (
      <div>
        { this.applyFilters(this.props.options).map(option => (
          <Option
            key={option.value}
            option={option}
            onClick={clickedOption =>
              this.context.selectHandler.selectOption(clickedOption)
            }
          />
        )) }
      </div>
    );
  }
}

OptionGroup.propTypes = {
  query: PropTypes.string,
  shouldFilterByQuery: PropTypes.bool,
  options: PropTypes.arrayOf(optionType),
};

OptionGroup.defaultProps = {
  query: null,
  shouldFilterByQuery: true,
  options: [],
};

OptionGroup.contextTypes = {
  selectHandler: PropTypes.instanceOf(SelectHandler).isRequired,
};

export default OptionGroup;
