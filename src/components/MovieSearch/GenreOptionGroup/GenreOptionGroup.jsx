import React from 'react';
import PropTypes from 'prop-types';
import { OptionGroup, optionType, SelectHandler } from 'components/Select';

const GenreOptionGroup = ({
  options,
}) => (
  <OptionGroup
    options={options}
  />
);

GenreOptionGroup.propTypes = {
  options: PropTypes.arrayOf(optionType),
};

GenreOptionGroup.defaultProps = {
  options: [],
};

export default GenreOptionGroup;
