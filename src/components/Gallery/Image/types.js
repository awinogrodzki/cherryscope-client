import PropTypes from 'prop-types';

export const imageProps = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  url: PropTypes.string,
  onClick: PropTypes.func,
};
