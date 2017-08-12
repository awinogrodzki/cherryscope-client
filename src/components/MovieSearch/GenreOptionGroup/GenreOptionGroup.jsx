import React from 'react';
import PropTypes from 'prop-types';
import { OptionGroup, optionType, SelectHandler } from 'components/Select';

const GenreOptionGroup = ({
  options,
  selectHandler,
}) => (
  <OptionGroup
    selectHandler={selectHandler}
    options={options}
  />
);

GenreOptionGroup.propTypes = {
  selectHandler: PropTypes.instanceOf(SelectHandler).isRequired,
  options: PropTypes.arrayOf(optionType),
};

GenreOptionGroup.defaultProps = {
  options: [],
};

export default GenreOptionGroup;
