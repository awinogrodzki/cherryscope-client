import PropTypes from 'prop-types';

export const movieType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  original_title: PropTypes.string,
  poster_path: PropTypes.string,
  vote_average: PropTypes.number,
  vote_count: PropTypes.number,
  release_date: PropTypes.string,
});
