import React from 'react';
import PropTypes from 'prop-types';
import { OptionGroup, optionType } from 'components/Select';

const GenreOptionGroup = ({
  options,
  query,
}) => (
  <OptionGroup
    options={options}
    query={query}
  />
);

GenreOptionGroup.propTypes = {
  options: PropTypes.arrayOf(optionType),
  query: PropTypes.string,
};

GenreOptionGroup.defaultProps = {
  options: [],
  query: null,
};

export default GenreOptionGroup;
