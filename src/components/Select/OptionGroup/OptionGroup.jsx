import React from 'react';
import PropTypes from 'prop-types';
import SelectHandler from '../SelectHandler';
import Option from '../Option';
import { optionType } from '../Option/types';

const filterByQuery = (options, query) => {
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

const OptionGroup = ({
  options,
  query,
  shouldFilterByQuery,
}, { selectHandler }) => {
  const applyFilters = (options) => {
    let filteredOptions = options;

    if (query && shouldFilterByQuery) {
      filteredOptions = filterByQuery(options, query);
    }

    return filteredOptions;
  };

  const optionsToRender = applyFilters(options).filter(option => !selectHandler.isOptionSelected(option));

  return (
    <div>
      { optionsToRender.map(option => (
        <Option
          key={option.value}
          option={option}
          onClick={clickedOption => selectHandler.selectOption(clickedOption)}
        />
      )) }
    </div>
  );
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
