import PropTypes from 'prop-types';

export const optionGroupType = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  index: PropTypes.number,
  getOptionIndex: PropTypes.func,
  getOptionClass: PropTypes.func,
  getOptionElement: PropTypes.func,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  filterByInput: PropTypes.bool,
  isSingle: PropTypes.bool,
  isUnique: PropTypes.bool,
  onOptionClick: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  customComponent: PropTypes.node,
};
