import PropTypes from 'prop-types';

export const imageIdType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);
